import { z } from 'nestjs-zod/z'

export const apiEnvSchema = z.object({
  PORT: z.string(),

  KAFKA_BROKER: z.string(),

  JWT_TOKEN_SECRET: z.string(),
  JWT_TOKEN_EXPIRATION_TIME: z.string(),
})
