import { Controller, Inject } from "@nestjs/common";
import { GoogleAuthService } from "../services";
import { ClientKafka, MessagePattern, Payload } from "@nestjs/microservices";
import { GoogleCallback, GoogleSignInUrl, OnSuccessSignIn } from "@app/contracts";
import * as jwt from 'jsonwebtoken';
import { AccountProvider } from "@app/types";
import { EVENT_BUS_SERVICE } from "@app/constants";


@Controller()
export class GoogleCommandController {
  constructor(
    private readonly googleAuthService: GoogleAuthService,
    @Inject(EVENT_BUS_SERVICE) private readonly client: ClientKafka
  ) { }

  @MessagePattern(GoogleSignInUrl.topic)
  async signInUrl(@Payload() params: GoogleSignInUrl.Request): Promise<GoogleSignInUrl.Response> {
    const { userId } = params;

    const url = this.googleAuthService.generateAuthUrl(userId)

    return {
      url
    }
  }

  @MessagePattern(GoogleCallback.topic)
  async callback(@Payload() params: GoogleCallback.Request): Promise<GoogleCallback.Response> {
    const { code, userId } = params;

    const tokens = await this.googleAuthService.authByCode(code);

    const decodedToken = jwt.decode(tokens.id_token);

    const expiredAt = new Date(tokens.expiry_date);

    const providerId = decodedToken['sub'] as string;

    const successSingInEvent: OnSuccessSignIn.Request = {
      provider: AccountProvider.GOOGLE,
      providerId,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiredAt,
      userId: userId,
    }

    await this.client.emit<OnSuccessSignIn.Response, OnSuccessSignIn.Request>(OnSuccessSignIn.topic, successSingInEvent);

    return null;
  }
}
