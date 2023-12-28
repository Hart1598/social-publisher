import { FileStatus, File as IFile } from '@app/types';
import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';

@Entity()
export abstract class File implements IFile {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'text' })
  path: string;

  @Column({ type: 'varchar' })
  status: FileStatus

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'text' })
  contentType: string;

  @Column({ type: 'int8' })
  contentSize: number;

  @Column({ type: 'varchar' })
  bucketId: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
