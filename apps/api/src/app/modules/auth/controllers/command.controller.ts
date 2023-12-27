import { EVENT_BUS_SERVICE } from "@app/constants";
import { RefreshToken, SignIn, SignUp, SignUpAdmin } from "@app/contracts";
import { SignInDto, SignUpAdminDto, SignUpDto } from "@app/dtos";
import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { Protected, Public, User } from "../../../decorators";
import { JWTUser, UserRole, UserStatus } from "@app/types";
import { eventBusTopics } from "../../broker-clients/broker-clients.module";

@Controller()
export class AuthCommandController {
  constructor(@Inject(EVENT_BUS_SERVICE) private readonly client: ClientKafka) { }

  async onModuleInit() {
    const subscribeTopicKeys = eventBusTopics

    subscribeTopicKeys.forEach((topic) => this.client.subscribeToResponseOf(topic))

    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }


  @Public()
  @Post('/auth/authorize/sign-in')
  signIn(@Body() body: SignInDto) {
    return this.client.send<SignIn.Response, SignIn.Request>(SignIn.topic, body)
  }

  @Public()
  @Post('/auth/authorize/sign-up')
  signUp(@Body() body: SignUpDto) {
    return this.client.send<SignUp.Response, SignUp.Request>(SignUp.topic, body)
  }

  @Protected({
    allowedRoles: [UserRole.ADMIN]
  })
  @Post('admin/auth/authorize/sign-up')
  signUpAdmin(@Body() body: SignUpAdminDto) {
    return this.client.send<SignUpAdmin.Response, SignUpAdmin.Request>(SignUpAdmin.topic, body)
  }

  @Protected({
    allowedRoles: [UserRole.ADMIN, UserRole.USER],
    allowedStatuses: [UserStatus.ACTIVE, UserStatus.BLOCKED, UserStatus.EMAIL_VERIFICATION]
  })
  @Get('admin/auth/authorize/refresh')
  refreshToken(@User() user: JWTUser) {
    const { id } = user;

    return this.client.send<RefreshToken.Response, RefreshToken.Request>(RefreshToken.topic, { userId: id })
  }
}
