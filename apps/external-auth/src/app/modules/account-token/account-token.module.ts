import { DynamicModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountToken } from "./entities";

@Module({})
export class AccountTokenModule {
  static forRoot(): DynamicModule {
    return {
      module: AccountTokenModule,
      controllers: [],
      imports: [TypeOrmModule.forFeature([AccountToken])],
      providers: [],
      exports: [],
    };
  }
}
