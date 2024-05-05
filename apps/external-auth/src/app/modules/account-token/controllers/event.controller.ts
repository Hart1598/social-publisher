import { OnAccountUpsert } from "@app/contracts";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { AccountTokenService } from "../services/account-token.service";
import { Controller } from "@nestjs/common";

@Controller()
export class EventController{
  constructor (private readonly accountTokenService: AccountTokenService) {}

  @MessagePattern(OnAccountUpsert.topic)
  async onAccountUpsert(@Payload() params: OnAccountUpsert.Request) {
    const { accountId, payload } = params;

    const tokens = Object.values(payload);

    const promises = tokens.map((tokenParams) => {
      const { token, ...otherParams } = tokenParams;

      return this.accountTokenService.onUpsertToken({ ...otherParams, accountId }, token);
    });

    await Promise.all(promises);
  }
}
