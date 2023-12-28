import { DynamicModule, Module } from "@nestjs/common";
import { FileService } from "./services/file.service";
import { File } from "./entities/file.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileQueryController } from "./controllers";
import { StorageModule } from "../storage/storage.module";

@Module({})
export class FileModule {
  static forRoot(): DynamicModule {
    return {
      module: FileModule,
      controllers: [FileQueryController],
      imports: [TypeOrmModule.forFeature([File]), StorageModule],
      providers: [FileService],
      exports: [FileService],
    };
  }
}
