export type StorageEventType = 'OBJECT_FINALIZE' | 'OBJECT_METADATA_UPDATE' | 'OBJECT_DELETE' | 'OBJECT_ARCHIVE'

export interface StorageEvent {
  objectId: string;
  messageId: string;
  eventType: StorageEventType;
  bucketId: string;
  objectGeneration: string;
  eventTime: string;
  publishTime: string;
}

export type FileStatus = 'active' | 'archived'

export interface File {
  id: string;
  path: string;
  status: FileStatus
  userId: string;
  contentType: string;
  contentSize: number;
  bucketId: string;
  createdAt: Date;
}

export interface FileUrlPayload {
  [fileId: string]: string;
}
