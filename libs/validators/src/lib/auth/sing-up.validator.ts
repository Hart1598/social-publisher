import { z } from 'nestjs-zod/z'

export const singUpSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
}).required()

export const singUpResponseSchema = z.object({
  token: z.string()
}).required()
