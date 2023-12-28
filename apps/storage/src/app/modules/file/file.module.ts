import { DynamicModule, Module } from "@nestjs/common";
import { FileService } from "./services/file.service";
import { File } from "./entities/file.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({})
export class FileModule {
  static forRoot(): DynamicModule {
    return {
      module: FileModule,
      imports: [TypeOrmModule.forFeature([File])],
      providers: [FileService],
      exports: [FileService],
    };
  }
}
