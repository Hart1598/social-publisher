import { AUTH_SERVICE } from "@app/constants";
import { SignIn, SignUp } from "@app/contracts";
import { SignInDto, SignUpDto } from "@app/dtos";
import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";

@Controller()
export class AuthCommandController {
  constructor(@Inject(AUTH_SERVICE) private readonly client: ClientKafka) { }

  async onModuleInit() {
    const subscribeTopicKeys = [SignIn.topic, SignUp.topic];

    subscribeTopicKeys.forEach((topic) => this.client.subscribeToResponseOf(topic))

    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }


  @Post('/auth/authorize/sign-in')
  signIn(@Body() body: SignInDto) {
    return this.client.send<SignIn.Response, SignIn.Request>(SignIn.topic, body)
  }

  @Post('/auth/authorize/sign-up')
  signUp(@Body() body: SignUpDto) {
    return this.client.send<SignUp.Response, SignUp.Request>(SignUp.topic, body)
  }

}
