import { z } from 'nestjs-zod/z'

export const callbackRequestSchema = z.object({
  code: z.string()
}).required()

