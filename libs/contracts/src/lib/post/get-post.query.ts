import { PostPresenter } from '@app/types'
import { getPost } from '@app/validators'
import { z } from 'nestjs-zod/z'

export namespace GetPost {
  export const topic = 'post.query.get-post'

  export type Request = z.infer<typeof getPost>

  export type Response = PostPresenter
}
