import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountToken } from "../entities";
import { Repository } from "typeorm";
import { TokenType } from "@app/types";
import { CryptoService } from "@app/utils";

@Injectable()
export class AccountTokenService {
  constructor(
    @InjectRepository(AccountToken)
    private readonly repository: Repository<AccountToken>,
    private readonly cryptoService: CryptoService
  ) {}

  create(accountToken: Partial<AccountToken>) {
    return this.repository.create(accountToken)
  }

  save(accountToken: AccountToken) {
    return this.repository.save(accountToken)
  }

  findByAccountId(accountId: string) {
    return this.repository.findOne({ where: { accountId } })
  }

  deleteByAccountIdAndType(accountId: string, type: TokenType) {
    return this.repository.delete({ accountId, type })
  }

  async onUpsertToken(token: Partial<AccountToken>, value: string) {
    const { type, accountId } = token;

    await this.deleteByAccountIdAndType(accountId, type);

    const tokenHash = await this.cryptoService.hash(value);

    const accountToken = this.create({ tokenHash, ...token });

    return this.save(accountToken);
  }
}
