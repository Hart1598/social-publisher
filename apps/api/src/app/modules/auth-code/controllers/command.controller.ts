import { EVENT_BUS_SERVICE } from "@app/constants";
import { VerifyAuthCode } from "@app/contracts";
import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { Protected, User } from "../../../decorators";
import { eventBusTopics } from "../../broker-clients/broker-clients.module";
import { JWTUser, UserRole, UserStatus } from "@app/types";
import { VerifyCodeDto } from "@app/dtos";

@Controller()
export class AuthCodeCommandController {
  constructor(@Inject(EVENT_BUS_SERVICE) private readonly client: ClientKafka) { }

  async onModuleInit() {
    const subscribeTopicKeys = eventBusTopics

    subscribeTopicKeys.forEach((topic) => this.client.subscribeToResponseOf(topic))

    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }


  @Protected({
    allowedRoles: [UserRole.ADMIN, UserRole.USER],
    allowedStatuses: [UserStatus.EMAIL_VERIFICATION],
  })
  @Post('/auth/verify/email')
  signUp(@Body() body: VerifyCodeDto, @User() user: JWTUser) {
    const { code } = body;

    return this.client.send<void, VerifyAuthCode.Request>(VerifyAuthCode.topic, {
      userId: user.id,
      code,
    })
  }
}
