import { AccountEnum, AccountStatus } from '@app/types';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Account as IAccount } from '@app/types'

@Entity()
export abstract class Account implements IAccount {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'varchar' })
  provider: AccountEnum;

  @Column({ type: 'varchar' })
  status: AccountStatus;

  @Column({ type: 'timestamptz' })
  expiresAt: Date;
}
