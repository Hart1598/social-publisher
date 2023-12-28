import { z } from 'nestjs-zod/z'

export const storageEnvSchema = z.object({
  KAFKA_BROKER: z.string(),

  PUBLIC_BUCKET_NAME: z.string(),
  PUBLIC_PUBSUB_STORAGE_TOPIC_NAME: z.string(),
  PUBLIC_PUBSUB_STORAGE_SUBSCRIPTION_NAME: z.string(),

  GOOGLE_CLOUD_PROJECT_ID: z.string(),
  GOOGLE_APPLICATION_CREDENTIALS: z.string(),

  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),
})
