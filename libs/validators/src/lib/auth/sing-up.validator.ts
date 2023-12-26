import { z } from 'nestjs-zod/z'

export const singUpSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
}).required()

export const singUpAdminSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
}).required()

export const singUpResponseSchema = z.object({
  accessToken: z.string()
}).required()
