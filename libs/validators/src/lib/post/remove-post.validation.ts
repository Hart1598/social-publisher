import { z } from 'nestjs-zod/z'

export const removePostSchema = z.object({
  id: z.number().int().positive()
})
