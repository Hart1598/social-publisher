import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { AuthCodeModule } from "./auth-code/auth-code.module";
import { StorageModule } from "./storage/storage.module";
import { ExternalAuthModule } from "./external-auth/external-auth.module";
import { PostAuthModule } from "./post/post.module";

@Module({
  imports: [AuthModule, UserModule, AuthCodeModule, StorageModule, ExternalAuthModule.forRoot(), PostAuthModule.forRoot()],
  controllers: [],
  providers: [],
})
export class ModulesModule { }
