import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';
import { v4 } from 'uuid';

export interface GenerateUploadSignedURLParams {
  contentType: string;
}

@Injectable()
export class StorageService {
  private storageClient = new Storage();

  private publicBucketName: string;

  constructor(private readonly configService: ConfigService) {
    const publicBucketName = this.configService.getOrThrow<string>('PUBLIC_BUCKET_NAME');

    this.publicBucketName = publicBucketName;
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

  private getFileUploadExpiresAt() {
    return Date.now() + 15 * 60 * 1000 // 15 min
  }

  async generateUploadSignedURL(params: GenerateUploadSignedURLParams) {
    const { contentType } = params;

    const { id, filePath } = this.generateFilePath()

    const [url] = await this.storageClient.bucket(this.publicBucketName).file(filePath).getSignedUrl({
      version: 'v4',
      action: 'write',
      expires: this.getFileUploadExpiresAt(),
      contentType,
    })

    return {
      url,
      id,
    };
  }
}
