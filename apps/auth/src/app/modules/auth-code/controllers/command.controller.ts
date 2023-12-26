import { OnVerifyAuthCode, VerifyAuthCode } from '@app/contracts';
import { Controller, Inject } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { AuthCodeService } from '../services';
import { EVENT_BUS_SERVICE } from '@app/constants';


@Controller()
export class AuthCodeCommandController  {
  constructor(
    private readonly authCodeService: AuthCodeService,
    @Inject(EVENT_BUS_SERVICE) private readonly client: ClientKafka
    ) {}

  @MessagePattern(VerifyAuthCode.topic)
  async verifyCode(@Payload() params: VerifyAuthCode.Request): Promise<void> {
    const { userId, code } = params;

    await this.authCodeService.validateAuthCode(code, userId);

    this.client.emit<void, OnVerifyAuthCode.Request>(OnVerifyAuthCode.topic, {
      userId,
    })
  }
}
