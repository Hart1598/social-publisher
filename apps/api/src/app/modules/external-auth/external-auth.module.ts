import { DynamicModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { BrokerClientsModule } from "../broker-clients/broker-clients.module";
import { ExternalAuthCommandController } from "./controllers";

@Module({})
export class ExternalAuthModule {
  static forRoot(): DynamicModule {
    return {
      module: ExternalAuthModule,
      imports: [
        ConfigModule,
        BrokerClientsModule,
      ],
      controllers: [ExternalAuthCommandController],
      providers: [],
    }
  }
}
