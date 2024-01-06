import { DynamicModule, Module } from "@nestjs/common";
import { GoogleCommandController } from "./controllers";
import { GoogleAuthService } from "./services";

@Module({})
export class GoogleModule {
  static forRoot(): DynamicModule {
    return {
      module: GoogleModule,
      controllers: [GoogleCommandController],
      imports: [],
      providers: [GoogleAuthService],
      exports: [],
    };
  }
}
