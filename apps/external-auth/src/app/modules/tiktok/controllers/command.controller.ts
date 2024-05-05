import { Controller, Inject } from "@nestjs/common";
import { ClientKafka, MessagePattern, Payload } from "@nestjs/microservices";
import { OnSuccessSignIn, TikTokCallback, TikTokSignInUrl } from "@app/contracts";
import { EVENT_BUS_SERVICE } from "@app/constants";
import { TikTokAuthService } from "../services/tiktok-auth.service";
import { TokenMemoryStorageService } from "../services/token-memory-storage.service";
import { ExceptionService } from "@app/utils";
import { AccountProvider } from "@app/types";


@Controller()
export class TikTokCommandController {
  constructor(
    private readonly tikTokAuthService: TikTokAuthService,
    private readonly tokenMemoryStorageService: TokenMemoryStorageService,
    private readonly exceptionService: ExceptionService,
    @Inject(EVENT_BUS_SERVICE) private readonly client: ClientKafka
  ) { }

  @MessagePattern(TikTokSignInUrl.topic)
  async signInUrl(@Payload() params: TikTokSignInUrl.Request): Promise<TikTokSignInUrl.Response> {
    const { userId } = params;

    const { url, csrfState } = this.tikTokAuthService.generateAuthUrl()

    this.tokenMemoryStorageService.save(csrfState, userId);

    return {
      url,
    }
  }

  @MessagePattern(TikTokCallback.topic)
  async callback(@Payload() params: TikTokCallback.Request): Promise<TikTokCallback.Response> {
    const { code, csrfToken } = params;

    const tokens = await this.tikTokAuthService.authByCode(code);

    if ('error' in tokens) throw this.exceptionService.unauthorized();

    const userId = this.tokenMemoryStorageService.get(csrfToken);

    if (!userId) throw this.exceptionService.unauthorized();

    const successSingInEvent: OnSuccessSignIn.Request = {
      provider: AccountProvider.TIKTOK,
      providerId: tokens.open_id,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiredAt: new Date(Date.now() + tokens.expires_in * 1000),
      userId: userId,
    }

    await this.client.emit<OnSuccessSignIn.Response, OnSuccessSignIn.Request>(OnSuccessSignIn.topic, successSingInEvent);
  }
}
