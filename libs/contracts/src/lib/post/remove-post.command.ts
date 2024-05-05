import { removePostSchema } from '@app/validators'
import { z } from 'nestjs-zod/z'

export namespace RemovePost {
  export const topic = 'post.command.remove-post'

  export type Request = z.infer<typeof removePostSchema>

  export type Response = void
}
