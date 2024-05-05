import { DynamicModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountToken } from "./entities";
import { EventController } from "./controllers";
import { AccountTokenService } from "./services/account-token.service";
import { CryptoModule } from "@app/utils";

@Module({})
export class AccountTokenModule {
  static forRoot(): DynamicModule {
    return {
      module: AccountTokenModule,
      controllers: [EventController],
      imports: [
        TypeOrmModule.forFeature([AccountToken]),
        CryptoModule.forRoot({
          cryptoHash: '10',
        })
      ],
      providers: [AccountTokenService],
      exports: [AccountTokenService],
    };
  }
}
