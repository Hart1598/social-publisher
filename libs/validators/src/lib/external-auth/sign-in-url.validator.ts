import { z } from 'nestjs-zod/z'

export const googleSingInUrlRequestSchema = z.object({
  userId: z.string()
}).required()


export const googleSingInUrlResponseSchema = z.object({
  url: z.string().url()
}).required()
