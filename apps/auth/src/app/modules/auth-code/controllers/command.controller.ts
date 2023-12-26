import { OnVerifyAuthCode, VerifyAuthCode } from '@app/contracts';
import { Controller, Inject } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { AuthCodeService } from '../services';
import { EVENT_BUS_SERVICE } from '@app/constants';
import { UserService } from '../../user';
import { ExceptionService } from '@app/utils';
import { UserStatus } from '@app/types';


@Controller()
export class AuthCodeCommandController  {
  constructor(
    private readonly authCodeService: AuthCodeService,
    private readonly userService: UserService,
    private readonly exceptionService: ExceptionService,
    @Inject(EVENT_BUS_SERVICE) private readonly client: ClientKafka
    ) {}

  @MessagePattern(VerifyAuthCode.topic)
  async verifyCode(@Payload() params: VerifyAuthCode.Request): Promise<void> {
    const { userId, code } = params;

    const user = await this.userService.findById(userId);

    if(!user) throw this.exceptionService.notFound()

    const isEmailVerification = user.status = UserStatus.EMAIL_VERIFICATION;

    if(!isEmailVerification) throw this.exceptionService.alreadyExist()

    await this.authCodeService.validateAuthCode(code, userId);

    this.client.emit<void, OnVerifyAuthCode.Request>(OnVerifyAuthCode.topic, {
      userId,
    })
  }
}
