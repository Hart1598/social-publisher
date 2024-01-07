import { OnAccountUpsert, OnSuccessSignIn } from "@app/contracts";
import { Controller, Inject } from "@nestjs/common";
import { ClientKafka, MessagePattern, Payload } from "@nestjs/microservices";
import { AccountService } from "../services/account.service";
import { AccountStatus, TokenType } from "@app/types";
import { EVENT_BUS_SERVICE } from "@app/constants";

@Controller()
export class EventController {
    constructor(
      private readonly accountService: AccountService,
      @Inject(EVENT_BUS_SERVICE) private readonly client: ClientKafka
    ) {}

    @MessagePattern(OnSuccessSignIn.topic)
    async onSuccessSignIn(@Payload() params: OnSuccessSignIn.Request): Promise<OnSuccessSignIn.Response> {
      const { provider, providerId, accessToken, refreshToken, expiredAt, userId } = params;

      const account = await this.accountService.onAuth({
        id: providerId,
        provider,
        expiresAt: expiredAt,
        status: AccountStatus.ACTIVE,
        userId
      });

      const refreshTokenExpiresAt = new Date(expiredAt);

      refreshTokenExpiresAt.setDate(refreshTokenExpiresAt.getDate() + 6);

      const onAccountUpsertEvent: OnAccountUpsert.Request = {
        accountId: account.id,
        payload: {
          access: {
            type: TokenType.ACCESS,
            token: accessToken,
            name: 'accessToken',
            expiresAt: expiredAt
          },
          refresh: {
            type: TokenType.REFRESH,
            token: refreshToken,
            name: 'refreshToken',
            expiresAt: refreshTokenExpiresAt
          }
        }
      }

      this.client.emit<OnAccountUpsert.Response, OnAccountUpsert.Request>(OnAccountUpsert.topic, onAccountUpsertEvent);
    }
}
