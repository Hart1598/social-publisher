export type StorageEventType = 'OBJECT_FINALIZE' | 'OBJECT_METADATA_UPDATE' | 'OBJECT_DELETE' | 'OBJECT_ARCHIVE'

export interface StorageEvent {
  messageId: string;
  eventType: StorageEventType;
  bucketId: string;
  objectGeneration: string;
  eventTime: string;
  publishTime: string;
}
