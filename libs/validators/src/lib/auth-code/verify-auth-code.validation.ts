import { z } from 'nestjs-zod/z'

export const verifyAuthCodeSchema = z.object({
  userId: z.string(),
  code: z.number().max(4)
})
