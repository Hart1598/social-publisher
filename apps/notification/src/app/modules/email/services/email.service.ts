import nodemailer from 'nodemailer';
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {

  private host: string;
  private port: number;
  private user: string;
  private password: string;
  private from: string;

  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {
    this.host = this.configService.getOrThrow<string>('SMTP_HOST');
    this.port = Number(this.configService.getOrThrow<string>('SMTP_PORT'));
    this.user = this.configService.getOrThrow<string>('SMTP_USER');
    this.password = this.configService.getOrThrow<string>('SMTP_PASSWORD');
    this.from = this.configService.getOrThrow<string>('SMTP_FROM');
  }

  private get smtpTransport() {
    return nodemailer.createTransport({
      host: this.host,
      port: this.port,
      auth: {
        user: this.user,
        pass: this.password,
      },
    });
  }

  async sendEmail(params: SendEmailParams) {
    const { to, subject, html } = params;

    const mailOptions = {
      from: `"Social publisher" <${this.from}>`,
      to: to,
      subject,
      html,
    };

    try {
      await this.smtpTransport.sendMail(mailOptions);
    } catch (error) {
      console.log(`Error sending email: ${error.message}`);
    }
  }
}
