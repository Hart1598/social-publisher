import { PostPresenter } from '@app/types'
import { getPosts } from '@app/validators'
import { z } from 'nestjs-zod/z'

export namespace GetPosts {
  export const topic = 'post.query.get-posts'

  export type Request = z.infer<typeof getPosts>

  export type Response = {
    posts: PostPresenter[]
    total: number
  }
}
