import { Module } from "@nestjs/common";
import { AuthorizeModule } from "./authorize";
import { UserModule } from "./user";
import { AuthCodeModule } from "./auth-code/auth-code.module";
import { BrokerClientsModule } from "./broker-clients/broker-clients.module";

@Module({
  imports: [AuthorizeModule, UserModule, AuthCodeModule, BrokerClientsModule],
  controllers: [],
  providers: [],
})
export class ModulesModule {}
