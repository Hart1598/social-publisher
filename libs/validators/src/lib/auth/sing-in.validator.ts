import { z } from 'nestjs-zod/z'

export const singInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
}).required()

export const singInResponseSchema = z.object({
  accessToken: z.string()
}).required()
