import { z } from 'nestjs-zod/z'

export const createPostSchema = z.object({
  title: z.string().min(0).max(100),
  body: z.string().min(0).max(1000),
  fileIds: z.array(z.string().uuid()).optional()
})
