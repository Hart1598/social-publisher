import { ExceptionService } from "@app/utils";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { AxiosInstance } from "axios";
import { URL, URLSearchParams } from 'url';

export interface SuccessAuthByCodeResponse {
  open_id: string;
  scope: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_expires_in: number;
  token_type: string;
}

export interface ErrorAuthByCodeResponse {
  error: string;
  error_description: string;
  log_id: string;
}

@Injectable()
export class TikTokAuthService {
  private clientKey: string;
  private redirectUri: string;
  private clientSecret: string;
  private axiosClient: AxiosInstance;

  constructor(
    private readonly configService: ConfigService,
    private readonly exceptionService: ExceptionService,
    private readonly httpService: HttpService,
  ) {
    this.clientKey = this.configService.getOrThrow('TIKTOK_CLIENT_KEY');
    this.redirectUri = this.configService.getOrThrow('TIKTOK_REDIRECT_URI');
    this.clientSecret = this.configService.getOrThrow('TIKTOK_CLIENT_SECRET');

    const axiosClient = this.httpService.axiosRef;

    this.axiosClient = axiosClient;
  }

  generateAuthUrl() {
    const url = new URL('https://www.tiktok.com/v2/auth/authorize/');

    const csrfState = Math.random().toString(36).substring(2);

    const params = new URLSearchParams({
      client_key: this.clientKey,
      scope: 'user.info.basic',
      response_type: 'code',
      redirect_uri: this.redirectUri,
      state: csrfState,
    });

    url.search = params.toString();

    return {
      url: url.toString(),
      csrfState,
    };
  }

  async authByCode(code: string) {
    const options = {
      method: 'POST',
      url: 'https://open.tiktokapis.com/v2/oauth/token/',
      data: {
        client_key: this.clientKey,
        client_secret: this.clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: this.redirectUri,
      },
    };

    const response = await this.axiosClient<SuccessAuthByCodeResponse | ErrorAuthByCodeResponse>(options);

    if (response.status !== 200) {
      throw this.exceptionService.unauthorized();
    }

    return response.data;
  }
}
