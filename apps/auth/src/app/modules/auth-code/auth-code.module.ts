import { Module } from "@nestjs/common";
import { AuthCodeCommandController, AuthCodeEventController } from "./controllers";
import { AuthCodeService } from "./services";
import { AuthCode } from "./entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user";

@Module({
  imports: [TypeOrmModule.forFeature([AuthCode]), UserModule],
  controllers: [AuthCodeEventController, AuthCodeCommandController],
  providers: [AuthCodeService],
  exports: [AuthCodeService]
})
export class AuthCodeModule {}
