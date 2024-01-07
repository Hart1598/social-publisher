import { onSuccessSignIn } from '@app/validators'
import { z } from 'nestjs-zod/z'

export namespace OnSuccessSignIn {
  export const topic = 'auth-external.event.on-success-sign-in'

  export type Request = z.infer<typeof onSuccessSignIn>

  export type Response = void;
}
