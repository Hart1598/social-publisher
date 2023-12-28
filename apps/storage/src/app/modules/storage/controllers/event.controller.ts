import { StorageUpdate } from '@app/contracts';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StorageService } from '../services';

@Controller()
export class StorageEventController  {
  constructor(
    private readonly storageService: StorageService,
    ) {}

    @MessagePattern(StorageUpdate.topic)
    async onUpdateStorage(@Payload() event: StorageUpdate.Request): Promise<void> {
      await this.storageService.onUpdateStorage(event);
    }
}
