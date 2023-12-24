import { z } from 'nestjs-zod/z'

export const apiEnvSchema = z.object({
  PORT: z.string(),

  KAFKA_BROKER: z.string(),

  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),
})
