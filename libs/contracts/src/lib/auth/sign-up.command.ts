import { singUpResponseSchema, singUpSchema } from '@app/validators'
import { z } from 'nestjs-zod/z'

export namespace SignUp {
  export const topic = 'auth.command.sign-up'

  export type Request = z.infer<typeof singUpSchema>

  export type Response = z.infer<typeof singUpResponseSchema>
}
