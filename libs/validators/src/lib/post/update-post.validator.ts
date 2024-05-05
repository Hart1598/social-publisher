import { z } from 'nestjs-zod/z'

export const updatePostSchema = z.object({
  title: z.string().min(0).max(100).optional(),
  body: z.string().min(0).max(1000).optional(),
})
