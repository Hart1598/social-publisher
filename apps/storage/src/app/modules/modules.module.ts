import { Module } from "@nestjs/common";
import { StorageModule } from "./storage/storage.module";
import { BrokerClientsModule } from "./broker-clients/broker-clients.module";

@Module({
  imports: [BrokerClientsModule, StorageModule],
  controllers: [],
  providers: [],
})
export class ModulesModule {}
