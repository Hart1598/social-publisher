import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UserQueryController } from "./controllers";
import { BrokerClientsModule } from "../broker-clients/broker-clients.module";

@Module({
  imports: [
    ConfigModule,
    BrokerClientsModule,
  ],
  controllers: [UserQueryController],
  providers: [],
})
export class UserModule {}
