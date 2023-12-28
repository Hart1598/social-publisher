import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';
import { v4 } from 'uuid';
import { File, FileUrlPayload, StorageEvent, StorageEventType } from '@app/types';
import { FileService } from '../../file/services/file.service';
import { ExceptionService } from '@app/utils';

export interface GenerateUploadSignedURLParams {
  contentType: string;
  userId: string;
}

@Injectable()
export class StorageService {
  private storageClient = new Storage();

  private publicBucketName: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly fileService: FileService,
    private readonly exceptionService: ExceptionService,
  ) {
    const publicBucketName = this.configService.getOrThrow<string>('PUBLIC_BUCKET_NAME');

    this.publicBucketName = publicBucketName;
  }

  private async deleteStorageObject(objectId: string) {
    const bucket = this.storageClient.bucket(this.publicBucketName);

    const file = bucket.file(objectId)

    await file.delete()
  }

  async deleteFile(fileId: string) {
    const file = await this.fileService.findById(fileId)

    if(!file) throw this.exceptionService.notFound()

    await this.deleteStorageObject(file.path);
  }

  async deleteUserFile(fileId: string, userId: string) {
    const file = await this.fileService.findByIdAndUserId(fileId, userId)

    if(!file) throw this.exceptionService.notFound()

    await this.deleteStorageObject(file.path);
  }

  private generateFilePath = () => {
    const currentDate = new Date();

    const year = currentDate.getUTCFullYear();

    const month = currentDate.getUTCMonth() + 1;

    const day = currentDate.getUTCDay()

    const id = v4();

    const filePath = `${year}/${month}/${day}/${id}`

    return {
      filePath,
      id,
    }
  }

  async getFileMetadata(fileId: string) {
    const bucket = this.storageClient.bucket(this.publicBucketName);

    const file = bucket.file(fileId)

    const [metadata] = await file.getMetadata()

    return metadata;
  }

  private getFileUploadExpiresAt() {
    return Date.now() + 15 * 60 * 1000 // 15 min
  }

  async generateUploadSignedURL(params: GenerateUploadSignedURLParams) {
    const { contentType, userId } = params;

    const { id, filePath } = this.generateFilePath()

    const [url] = await this.storageClient.bucket(this.publicBucketName).file(filePath).getSignedUrl({
      version: 'v4',
      action: 'write',
      expires: this.getFileUploadExpiresAt(),
      contentType,
      extensionHeaders: {
        'x-goog-meta-user': userId
      }
    })

    return {
      url,
      id,
    };
  }

  async generateReadFileSignedURL(file: File) {
    const [url] = await this.storageClient.bucket(file.bucketId).file(file.path).getSignedUrl({
      version: 'v4',
      action: 'read',
      expires: this.getFileUploadExpiresAt(),
    })

    return {
      [file.id]: url,
    }
  }

  async generateReadFileSignedURLs(files: File[]) {
    const urlPromises = files.map((file) => this.generateReadFileSignedURL(file));

    const urls = await Promise.all(urlPromises);

    const payload = urls.reduce<FileUrlPayload>((map, fileUrl) => {
      const nextMap = {
        ...map,
        ...fileUrl,
      }

      return nextMap;
    }, {})

    return payload
  }

  extractFileIdFormObjectId(objectId: string) {
    return objectId.split('/').pop()
  }

  async onUpdateStorage(event: StorageEvent) {
    const eventHandlerPromise = this.handlerByEventType(event.eventType);

    if (!eventHandlerPromise) return;

    const eventHandler = await eventHandlerPromise;

    if (eventHandler) {
      await eventHandler(event);
    }
  }

  private async handlerByEventType(eventType: StorageEventType) {
    const handlerMap: Record<StorageEventType, (event: StorageEvent) => Promise<void> | undefined> = {
      OBJECT_FINALIZE: this.onUploadFile.bind(this),
      OBJECT_DELETE: this.onDeleteFile.bind(this),
      OBJECT_ARCHIVE: this.onArchiveFile.bind(this),
      OBJECT_METADATA_UPDATE: undefined,
    }

    return handlerMap[eventType];
  }

  private async onUploadFile(event: StorageEvent) {
    const { bucketId, objectId } = event;

    const fileMetadata = await this.getFileMetadata(objectId);

    const { contentType, size, metadata, timeCreated } = fileMetadata;

    const userId = metadata.user as string | undefined;

    if(!userId) throw new Error('Not found user')

    const id = this.extractFileIdFormObjectId(objectId)

    const file = this.fileService.create({
      id,
      bucketId,
      createdAt: new Date(timeCreated),
      contentSize: Number(size),
      contentType,
      path: objectId,
      status: 'active',
      userId,
    })

    await this.fileService.save(file)
  }

  private async onDeleteFile(event: StorageEvent) {
    const { objectId } = event;

    const id = this.extractFileIdFormObjectId(objectId)

    await this.fileService.deleteById(id);
  }

  private async onArchiveFile(event: StorageEvent) {
    const { objectId } = event;

    const id = this.extractFileIdFormObjectId(objectId)

    await this.fileService.updateById(id, { status: 'active' });
  }
}
