import { SendEmailNotification } from '@app/contracts';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmailService } from '../services';


@Controller()
export class EmailEventController  {
  constructor(
    private readonly emailService: EmailService,
  ) {}

  @MessagePattern(SendEmailNotification.topic)
  async sendEmail(@Payload() params: SendEmailNotification.Request): Promise<void> {
    const { code, user } = params;

    const { email } = user;

    await this.emailService.sendEmail({ to: email, html: `Your code is: ${code}`, subject: `Verification for ${user.username}` })
  }
}
