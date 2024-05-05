import { DynamicModule, Module } from "@nestjs/common";
import { TikTokCommandController } from "./controllers/command.controller";
import { TikTokAuthService } from "./services/tiktok-auth.service";
import { HttpModule } from "@nestjs/axios";


@Module({})
export class TikTokModule {
  static forRoot(): DynamicModule {
    return {
      module: TikTokModule,
      controllers: [TikTokCommandController],
      imports: [HttpModule],
      providers: [TikTokAuthService],
      exports: [],
    };
  }
}
