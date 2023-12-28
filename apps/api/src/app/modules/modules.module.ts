import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { AuthCodeModule } from "./auth-code/auth-code.module";
import { StorageModule } from "./storage/storage.module";

@Module({
  imports: [AuthModule, UserModule, AuthCodeModule, StorageModule],
  controllers: [],
  providers: [],
})
export class ModulesModule {}
