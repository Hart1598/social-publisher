import { Module } from "@nestjs/common";
import { AuthCodeCommandController, AuthCodeEventController } from "./controllers";
import { AuthCodeService } from "./services";

@Module({
  imports: [],
  controllers: [AuthCodeEventController, AuthCodeCommandController],
  providers: [AuthCodeService],
  exports: [AuthCodeService]
})
export class AuthCodeModule {}
