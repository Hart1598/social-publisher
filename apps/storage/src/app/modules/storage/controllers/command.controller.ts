import { CreateUploadURL, DeleteFile, DeleteUserFile } from '@app/contracts';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StorageService } from '../services';


@Controller()
export class StorageCommandController  {
  constructor(
    private readonly storageService: StorageService) {}

  @MessagePattern(CreateUploadURL.topic)
  async createUploadURL(@Payload() params: CreateUploadURL.Request): Promise<CreateUploadURL.Response> {
    const { contentType, userId } = params;

    const { url, id } = await this.storageService.generateUploadSignedURL({ contentType, userId })

    return {
      url,
      id,
    }
  }

  @MessagePattern(DeleteFile.topic)
  async deleteFile(@Payload() params: DeleteFile.Request): Promise<DeleteFile.Response> {
    const { fileId } = params;

    await this.storageService.deleteFile(fileId)
  }

  @MessagePattern(DeleteUserFile.topic)
  async deleteUserFile(@Payload() params: DeleteUserFile.Request): Promise<DeleteUserFile.Response> {
    const { fileId, userId } = params;

    await this.storageService.deleteUserFile(fileId, userId)
  }
}
