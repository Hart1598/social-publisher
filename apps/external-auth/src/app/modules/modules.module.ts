import { DynamicModule, Module } from "@nestjs/common";
import { GoogleModule } from "./google/google.module";
import { GoogleCommandController } from "./google/controllers";
import { GoogleAuthService } from "./google/services";

@Module({})
export class ModulesModule {
  static forRoot(): DynamicModule {
    return {
      module: ModulesModule,
      controllers: [GoogleCommandController],
      imports: [GoogleModule.forRoot()],
      providers: [GoogleAuthService],
      exports: [],
    };
  }
}
