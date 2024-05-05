import { updatePostSchema } from '@app/validators'
import { z } from 'nestjs-zod/z'

export namespace UpdatePost {
  export const topic = 'post.command.update-post'

  export type Request = z.infer<typeof updatePostSchema>

  export type Response = void
}
