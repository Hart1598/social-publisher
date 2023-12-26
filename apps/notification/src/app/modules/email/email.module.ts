import { Module } from "@nestjs/common";
import { EmailEventController } from "./controllers";
import { EmailService } from "./services";

@Module({
  imports: [],
  controllers: [EmailEventController],
  providers: [EmailService],
})
export class EmailModule {}
