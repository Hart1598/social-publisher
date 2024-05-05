import { Post } from '@app/types'

export namespace OnUpdatePost {
  export const topic = 'post.event.updated-post'

  export type Request = Post

  export type Response = void
}
