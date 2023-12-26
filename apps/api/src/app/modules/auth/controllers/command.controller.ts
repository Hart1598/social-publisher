import { AUTH_SERVICE } from "@app/constants";
import { SignIn, SignUp, SignUpAdmin } from "@app/contracts";
import { SignInDto, SignUpAdminDto, SignUpDto } from "@app/dtos";
import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { Protected, Public } from "../../../decorators";
import { UserRole } from "@app/types";
import { authServiceTopics } from "../../broker-clients/broker-clients.module";

@Controller()
export class AuthCommandController {
  constructor(@Inject(AUTH_SERVICE) private readonly client: ClientKafka) { }

  async onModuleInit() {
    const subscribeTopicKeys = authServiceTopics

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
}
