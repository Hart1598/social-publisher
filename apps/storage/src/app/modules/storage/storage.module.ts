import { Module } from "@nestjs/common";
import { StorageCommandController, StorageEventController, StorageQueryController } from "./controllers";

@Module({
  imports: [],
  controllers: [StorageCommandController, StorageEventController, StorageQueryController],
  providers: [],
})
export class StorageModule {}
