import { DynamicModule, Module } from "@nestjs/common";
import { GoogleModule } from "./google/google.module";
import { GoogleCommandController } from "./google/controllers";
import { GoogleAuthService } from "./google/services";
import { AccountModule } from "./account/account.module";
import { AccountTokenModule } from "./account-token/account-token.module";
import { BrokerClientsModule } from "./broker-clients/broker-clients.module";

@Module({})
export class ModulesModule {
  static forRoot(): DynamicModule {
    return {
      module: ModulesModule,
      controllers: [GoogleCommandController],
      imports: [BrokerClientsModule, GoogleModule.forRoot(), AccountModule.forRoot(), AccountTokenModule.forRoot()],
      providers: [GoogleAuthService],
      exports: [],
    };
  }
}
