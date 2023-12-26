import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { AuthCodeModule } from "./auth-code/auth-code.module";

@Module({
  imports: [AuthModule, UserModule, AuthCodeModule],
  controllers: [],
  providers: [],
})
export class ModulesModule {}
