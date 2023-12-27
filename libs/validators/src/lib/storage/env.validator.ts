import { z } from 'nestjs-zod/z'

export const storageEnvSchema = z.object({
  KAFKA_BROKER: z.string(),
  PUBLIC_BUCKET_NAME: z.string(),
  PUBLIC_PUBSUB_STORAGE_TOPIC_NAME: z.string(),
  PUBLIC_PUBSUB_STORAGE_SUBSCRIPTION_NAME: z.string(),
  GOOGLE_CLOUD_PROJECT_ID: z.string(),
  GOOGLE_APPLICATION_CREDENTIALS: z.string(),
})
