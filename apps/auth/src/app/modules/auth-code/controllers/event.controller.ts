import { CreateUser, SendEmailNotification } from '@app/contracts';
import { Controller, Inject } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { AuthCodeService } from '../services';
import { EVENT_BUS_SERVICE } from '@app/constants';


@Controller()
export class AuthCodeEventController  {
  constructor(
    private readonly authCodeService: AuthCodeService,
    @Inject(EVENT_BUS_SERVICE) private readonly client: ClientKafka
    ) {}

  @MessagePattern(CreateUser.topic)
  async onCreateUser(@Payload() user: CreateUser.Request): Promise<void> {
    const authCode = await this.authCodeService.createVerificationCode(user);

    this.client.emit<void, SendEmailNotification.Request>(SendEmailNotification.topic, {
      code: authCode.code,
      user,
    })
  }
}
