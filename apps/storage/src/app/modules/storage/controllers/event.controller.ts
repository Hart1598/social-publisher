import { StorageUpdate } from '@app/contracts';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';


@Controller()
export class StorageEventController  {
  constructor() {}

  @MessagePattern(StorageUpdate.topic)
  async createUploadURL(@Payload() event: StorageUpdate.Request): Promise<void> {
    console.log(event);
  }
}
