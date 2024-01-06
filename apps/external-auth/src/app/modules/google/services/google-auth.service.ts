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

  constructor(private readonly configService: ConfigService) {
    const client = new google.auth.OAuth2(
      this.configService.getOrThrow('GOOGLE_CLIENT_ID'),
      this.configService.getOrThrow('GOOGLE_CLIENT_SECRET'),
      this.configService.getOrThrow('GOOGLE_CALLBACK_URL')
    )

    this.client = client;
  }

  generateAuthUrl() {
    const url = this.client.generateAuthUrl({
      access_type: 'offline',
      scope: this.scopes,
    });

    return url;
  }

  async authByCode(code: string) {
    const { tokens } = await this.client.getToken(code)

    return tokens;
  }
}
