import { PublicUser } from '@app/types'
import { getUserByIdSchema } from '@app/validators'
import { z } from 'nestjs-zod/z'

export namespace GetUserById {
  export const topic = 'user.query.get-user-by-id'

  export type Request = z.infer<typeof getUserByIdSchema>

  export type Response = PublicUser
}
