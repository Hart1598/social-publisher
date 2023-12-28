import { Module } from "@nestjs/common";
import { StorageCommandController, StorageEventController } from "./controllers";
import { PublicStorageListenerService, StorageService } from "./services";
import { FileModule } from "../file/file.module";

@Module({
  imports: [FileModule.forRoot()],
  controllers: [StorageCommandController, StorageEventController],
  providers: [PublicStorageListenerService, StorageService],
  exports: [StorageService]
})
export class StorageModule {}
