import { DynamicModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "./entities";

@Module({})
export class AccountModule {
  static forRoot(): DynamicModule {
    return {
      module: AccountModule,
      controllers: [],
      imports: [TypeOrmModule.forFeature([Account])],
      providers: [],
      exports: [],
    };
  }
}
