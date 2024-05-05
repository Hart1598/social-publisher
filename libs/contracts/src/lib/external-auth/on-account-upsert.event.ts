import { onAccountUpsert } from '@app/validators'
import { z } from 'nestjs-zod/z'

export namespace OnAccountUpsert {
  export const topic = 'auth-external.event.on-account-upsert'

  export type Request = z.infer<typeof onAccountUpsert>

  export type Response = void;
}
