import { z } from 'nestjs-zod/z'

export const googleSingInUrlResponseSchema = z.object({
  url: z.string().url()
}).required()
