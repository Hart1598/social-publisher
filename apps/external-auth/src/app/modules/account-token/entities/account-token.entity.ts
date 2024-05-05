import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AccountToken as IAccountToken, TokenType } from '@app/types'

@Entity()
export abstract class AccountToken implements IAccountToken {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar' })
  accountId: string;

  @Column({ type: 'text' })
  tokenHash: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  type: TokenType;

  @Column({ type: 'timestamptz' })
  expiresAt: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
