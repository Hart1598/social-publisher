import { Module } from "@nestjs/common";
import { AuthorizeModule } from "./authorize";

@Module({
  imports: [AuthorizeModule],
  controllers: [],
  providers: [],
})
export class ModulesModule {}
