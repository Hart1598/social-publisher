import { OnVerifyAuthCode } from '@app/contracts';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from '../services/user.service';
import { UserStatus } from '@app/types';

@Controller()
export class UserEventController  {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(OnVerifyAuthCode.topic)
  async onVerifyUser(@Payload() params: OnVerifyAuthCode.Request): Promise<void> {
    const { userId } = params;

    await this.userService.updateUserById(userId, { status: UserStatus.ACTIVE })
  }
}
