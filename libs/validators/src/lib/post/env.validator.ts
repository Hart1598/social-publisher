import { z } from 'nestjs-zod/z'

export const postEnvSchema = z.object({
  KAFKA_BROKER: z.string(),
})
