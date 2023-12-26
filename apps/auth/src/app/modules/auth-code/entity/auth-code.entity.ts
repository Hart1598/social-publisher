import { IAuthCode } from '@app/types';
import { PrimaryGeneratedColumn, Entity, Column, CreateDateColumn } from 'typeorm';

@Entity()
export abstract class AuthCode implements IAuthCode {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'int2' })
    code: number;

    @Column('uuid')
    userId: string;

    @Column({ type: 'timestamptz' })
    expiresAt: Date;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;
}
