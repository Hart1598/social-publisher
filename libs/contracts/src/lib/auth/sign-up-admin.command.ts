import { singUpResponseSchema, singUpAdminSchema } from '@app/validators'
import { z } from 'nestjs-zod/z'

export namespace SignUpAdmin {
  export const topic = 'auth.command.sign-up-admin'

  export type Request = z.infer<typeof singUpAdminSchema>

  export type Response = z.infer<typeof singUpResponseSchema>
}
