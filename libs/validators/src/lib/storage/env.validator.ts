import { z } from 'nestjs-zod/z'

export const storageEnvSchema = z.object({
  KAFKA_BROKER: z.string(),
})
