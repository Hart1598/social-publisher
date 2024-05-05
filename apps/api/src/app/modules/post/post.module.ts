import { DynamicModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { BrokerClientsModule } from "../broker-clients/broker-clients.module";
import { PostCommandController, PostQueryController } from "./controllers";

@Module({})
export class PostAuthModule {
  static forRoot(): DynamicModule {
    return {
      module: PostAuthModule,
      imports: [
        ConfigModule,
        BrokerClientsModule,
      ],
      controllers: [PostCommandController, PostQueryController],
      providers: [],
    }
  }
}
