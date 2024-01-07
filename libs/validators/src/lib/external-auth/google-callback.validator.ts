import { z } from 'nestjs-zod/z'

export const callbackRequestSchema = z.object({
  code: z.string(),
  userId: z.string()
}).required()

