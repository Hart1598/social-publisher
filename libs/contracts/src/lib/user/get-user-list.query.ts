import { PublicUser } from '@app/types'
import { getUserListSchema } from '@app/validators'
import { z } from 'nestjs-zod/z'

export namespace GetUserList {
  export const topic = 'user.query.get-user-list'

  export type Request = z.infer<typeof getUserListSchema>

  export type Response = {
    users: PublicUser[]
    total: number
  }
}
