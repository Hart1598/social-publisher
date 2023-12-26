import { z } from 'nestjs-zod/z'

export const authEnvSchema = z.object({
  PORT: z.string(),

  KAFKA_BROKER: z.string(),

  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),

  JWT_TOKEN_SECRET: z.string(),
  JWT_TOKEN_EXPIRATION_TIME: z.string(),

  CRYPTO_HASH_SALT: z.string(),
})
