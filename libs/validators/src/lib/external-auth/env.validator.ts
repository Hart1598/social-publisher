import { z } from 'nestjs-zod/z'

export const externalAuthEnvSchema = z.object({
  KAFKA_BROKER: z.string(),
})
