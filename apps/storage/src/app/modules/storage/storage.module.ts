import { Module } from "@nestjs/common";
import { StorageCommandController, StorageEventController, StorageQueryController } from "./controllers";
import { PublicStorageListenerService, StorageService } from "./services";

@Module({
  imports: [],
  controllers: [StorageCommandController, StorageEventController, StorageQueryController],
  providers: [PublicStorageListenerService, StorageService],
})
export class StorageModule {}
