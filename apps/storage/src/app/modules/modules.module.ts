import { Module } from "@nestjs/common";
import { StorageModule } from "./storage/storage.module";
import { BrokerClientsModule } from "./broker-clients/broker-clients.module";
import { FileModule } from "./file/file.module";

@Module({
  imports: [BrokerClientsModule, FileModule.forRoot(), StorageModule],
  controllers: [],
  providers: [],
})
export class ModulesModule {}
