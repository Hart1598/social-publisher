import { z } from 'nestjs-zod/z'

export const apiEnvSchema = z.object({
  PORT: z.string(),
})
