import { Module } from "@nestjs/common";
import { StorageCommandController, StorageEventController, StorageQueryController } from "./controllers";
import { PublicStorageListenerService } from "./services";

@Module({
  imports: [],
  controllers: [StorageCommandController, StorageEventController, StorageQueryController],
  providers: [PublicStorageListenerService],
})
export class StorageModule {}
