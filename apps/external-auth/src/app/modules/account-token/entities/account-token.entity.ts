import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AccountToken as IAccountToken } from '@app/types'
import { Account } from '../../account/entities';

@Entity()
export abstract class AccountToken implements IAccountToken {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Account, account => account.id)
  @Column({ type: 'varchar' })
  accountId: string;

  @Column({ type: 'text' })
  tokenHash: string;

  @Column({ type: 'varchar' })
  name: string;
}
