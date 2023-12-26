import { Module } from "@nestjs/common";
import { AuthCommandController } from "./controllers";
import { ConfigModule } from "@nestjs/config";
import { BrokerClientsModule } from "../broker-clients/broker-clients.module";

@Module({
  imports: [
    ConfigModule,
    BrokerClientsModule,
  ],
  controllers: [AuthCommandController],
  providers: [],
})
export class AuthModule {}
