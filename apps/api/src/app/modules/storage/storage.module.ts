import { Module } from "@nestjs/common";
import { StorageCommandController, StorageQueryController } from "./controllers";

@Module({
  imports: [],
  controllers: [StorageCommandController, StorageQueryController],
  providers: [],
})
export class StorageModule {}
