import { DynamicModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "./entities";
import { CommandController, EventController, QueryController } from "./controllers";
import { AccountService } from "./services/account.service";

@Module({})
export class AccountModule {
  static forRoot(): DynamicModule {
    return {
      module: AccountModule,
      controllers: [CommandController, EventController, QueryController],
      imports: [TypeOrmModule.forFeature([Account])],
      providers: [AccountService],
      exports: [],
    };
  }
}
