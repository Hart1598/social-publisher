import { AccountProvider, AccountStatus } from '@app/types';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Account as IAccount } from '@app/types'
import { AccountToken } from '../../account-token/entities';

@Entity()
export abstract class Account implements IAccount {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'varchar' })
  provider: AccountProvider;

  @Column({ type: 'varchar' })
  status: AccountStatus;

  @Column({ type: 'timestamptz' })
  expiresAt: Date;

  @OneToMany(() => AccountToken, token => token.accountId)
  tokens: AccountToken[]
}
