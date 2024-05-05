import { Module } from "@nestjs/common";

@Module({})
export class ModulesModule {
  static forRoot() {
    return {
      module: ModulesModule,
      imports: [],
      controllers: [],
      providers: [],
    }
  }
}
