import { createPostSchema } from '@app/validators'
import { z } from 'nestjs-zod/z'

export namespace CreatePost {
  export const topic = 'post.command.create-post'

  export type Request = z.infer<typeof createPostSchema>

  export type Response = {
    id: number
  }
}
