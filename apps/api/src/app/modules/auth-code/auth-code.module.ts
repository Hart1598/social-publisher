import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { BrokerClientsModule } from "../broker-clients/broker-clients.module";
import { AuthCodeCommandController } from "./controllers";

@Module({
  imports: [
    ConfigModule,
    BrokerClientsModule,
  ],
  controllers: [AuthCodeCommandController],
  providers: [],
})
export class AuthCodeModule {}
