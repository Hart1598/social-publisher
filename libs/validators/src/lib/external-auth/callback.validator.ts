import { z } from 'nestjs-zod/z'

export const callbackRequestSchema = z.object({
  code: z.string(),
  userId: z.string()
}).required()

export const tiktokCallbackRequestSchema = z.object({
  code: z.string(),
  csrfToken: z.string()
}).required()

