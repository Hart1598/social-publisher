import { Module } from "@nestjs/common";
import { StorageCommandController } from "./controllers";

@Module({
  imports: [],
  controllers: [StorageCommandController],
  providers: [],
})
export class StorageModule {}
