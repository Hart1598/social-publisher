import { StorageEvent } from '@app/types'

export namespace StorageUpdate {
  export const topic = 'storage.event.storage-update'

  export type Request = StorageEvent
}
