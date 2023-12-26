import { Module } from "@nestjs/common";
import { AuthorizeModule } from "./authorize";
import { UserModule } from "./user";

@Module({
  imports: [AuthorizeModule, UserModule],
  controllers: [],
  providers: [],
})
export class ModulesModule {}
