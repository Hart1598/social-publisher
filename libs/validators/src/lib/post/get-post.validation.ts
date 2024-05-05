import { z } from 'nestjs-zod/z'

export const getPost = z.object({
  userId: z.string().uuid(),
  postId: z.number().int().positive()
})

export const getPosts = z.object({
  userId: z.string().uuid(),
  take: z.number().int().positive().default(10),
  skip: z.number().int().positive().default(0)
})
