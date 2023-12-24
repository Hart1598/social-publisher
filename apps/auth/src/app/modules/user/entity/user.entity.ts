import { UserRole, UserStatus } from '@app/types';
import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from 'typeorm';
import { User as IUser } from '@app/types'

@Entity()
export abstract class User implements IUser {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: true })
    username: string;

    @Column({ type: 'text' })
    email: string;

    @Column({ type: 'text' })
    passwordHash: string;

    @Column({ type: 'text' })
    role: UserRole;

    @Column({ type: 'text' })
    status: UserStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
