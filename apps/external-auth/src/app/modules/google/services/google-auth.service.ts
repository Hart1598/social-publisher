import { ExceptionService } from "@app/utils";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { google, Auth } from 'googleapis';


@Injectable()
export class GoogleAuthService {
  private client: Auth.OAuth2Client;

  private scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ]

  constructor(
    private readonly configService: ConfigService,
    private readonly exceptionService: ExceptionService,
    ) {
    const client = new google.auth.OAuth2(
      this.configService.getOrThrow('GOOGLE_CLIENT_ID'),
      this.configService.getOrThrow('GOOGLE_CLIENT_SECRET'),
      this.configService.getOrThrow('GOOGLE_CALLBACK_URL')
    )

    this.client = client;
  }

  generateAuthUrl(userId: string) {
    const url = this.client.generateAuthUrl({
      access_type: 'offline',
      scope: this.scopes,
      state: userId,
    });

    return url;
  }

  async authByCode(code: string) {
    const { tokens, res } = await this.client.getToken(code)

    if (res.status !== 200) {
      throw this.exceptionService.unauthorized()
    }

    return tokens;
  }
}
