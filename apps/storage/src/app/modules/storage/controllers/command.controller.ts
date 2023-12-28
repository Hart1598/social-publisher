import { CreateUploadURL } from '@app/contracts';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StorageService } from '../services';


@Controller()
export class StorageCommandController  {
  constructor(private readonly storageService: StorageService) {}

  @MessagePattern(CreateUploadURL.topic)
  async createUploadURL(@Payload() params: CreateUploadURL.Request): Promise<CreateUploadURL.Response> {
    const { contentType, userId } = params;

    const { url, id } = await this.storageService.generateUploadSignedURL({ contentType, userId })

    return {
      url,
      id,
    }
  }
}
