import { Module } from "@nestjs/common";
import { AuthCommandController } from "./controllers";

@Module({
  imports: [],
  controllers: [AuthCommandController],
  providers: [],
})
export class AuthModule {}
