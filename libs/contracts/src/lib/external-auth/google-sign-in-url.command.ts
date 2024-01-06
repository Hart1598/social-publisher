import { googleSingInUrlResponseSchema } from '@app/validators'
import { z } from 'nestjs-zod/z'

export namespace GoogleSignInUrl {
  export const topic = 'auth-external.command.google-sign-in-url'

  export type Request = {}

  export type Response = z.infer<typeof googleSingInUrlResponseSchema>
}
