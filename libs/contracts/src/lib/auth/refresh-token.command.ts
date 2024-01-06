import { refreshTokenSchema, singInResponseSchema } from '@app/validators'
import { z } from 'nestjs-zod/z'

export namespace RefreshToken {
  export const topic = 'auth.command.refresh-token'

  export type Request = z.infer<typeof refreshTokenSchema>

  export type Response = z.infer<typeof singInResponseSchema>
}
