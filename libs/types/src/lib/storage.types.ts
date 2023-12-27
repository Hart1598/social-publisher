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
