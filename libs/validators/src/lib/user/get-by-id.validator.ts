import { z } from 'nestjs-zod/z'

export const getUserByIdSchema = z.object({
  userId: z.string()
})
