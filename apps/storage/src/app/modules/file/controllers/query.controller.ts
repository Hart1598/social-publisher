import { Controller } from '@nestjs/common';
import { FileService } from '../services/file.service';
import { StorageService } from '../../storage/services';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetFile, GetFiles, GetUserFile, GetUserFiles, GetUserFilesURL } from '@app/contracts';


@Controller()
export class FileQueryController  {
  constructor(
    private readonly storageService: StorageService,
    private readonly fileService: FileService,
  ) {}

  @MessagePattern(GetFile.topic)
  async getFile(@Payload() params: GetFile.Request): Promise<GetFile.Response> {
    const { fileId } = params;

    return this.fileService.findById(fileId);
  }

  @MessagePattern(GetUserFile.topic)
  async getUserFile(@Payload() params: GetUserFile.Request): Promise<GetUserFile.Response> {
    const { fileId, userId } = params;

    return this.fileService.findByIdAndUserId(fileId, userId);
  }

  @MessagePattern(GetFiles.topic)
  async getFiles(@Payload() params: GetFiles.Request): Promise<GetFiles.Response> {
    const { fileIds } = params;

    return this.fileService.findByIds(fileIds);
  }

  @MessagePattern(GetUserFiles.topic)
  async getUserFiles(@Payload() params: GetUserFiles.Request): Promise<GetUserFiles.Response> {
    const { userId } = params;

    return this.fileService.findByUserId(userId);
  }

  @MessagePattern(GetUserFilesURL.topic)
  async getFileUrls(@Payload() params: GetUserFilesURL.Request): Promise<GetUserFilesURL.Response> {
    const { userId, fileIds } = params;

    const files = await this.fileService.findByIdsAndUserId(fileIds, userId);

    return this.storageService.generateReadFileSignedURLs(files);
  }
}
