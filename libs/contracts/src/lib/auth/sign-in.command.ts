import { singInResponseSchema, singInSchema } from '@app/validators'
import { z } from 'nestjs-zod/z'

export namespace SignIn {
  export const topic = 'auth.command.sign-in'

  export type Request = z.infer<typeof singInSchema>

  export type Response = z.infer<typeof singInResponseSchema>
}
