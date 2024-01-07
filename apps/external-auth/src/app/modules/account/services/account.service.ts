import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { Account } from "../entities";
import { AccountStatus } from "@app/types";

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private repository: Repository<Account>,
  ) {}

  create(account: Partial<Account>) {
    return this.repository.create(account)
  }

  save(account: Account) {
    return this.repository.save(account)
  }

  findById(id: string) {
    const options: FindOneOptions<Account> = {
      where: {
        id,
      }
    }

    return this.repository.findOne(options)
  }

  updateById(id: string, account: Partial<Account>) {
    return this.repository.update(id, account)
  }

  async onAuth(account: Partial<Account>) {
    const { id, expiresAt } = account;

    const existedAccount = await this.findById(id);

    if(existedAccount) {
      await this.updateById(id, { expiresAt, status: AccountStatus.ACTIVE })

      return existedAccount;
    }

    const newAccount = this.create(account);

    await this.save(newAccount);

    return newAccount;
  }
}
