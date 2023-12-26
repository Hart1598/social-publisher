import { z } from 'nestjs-zod/z'

export const notificationEnvSchema = z.object({
  KAFKA_BROKER: z.string(),

  SMTP_HOST: z.string(),
  SMTP_PORT: z.string(),
  SMTP_USER: z.string(),
  SMTP_PASSWORD: z.string(),
  SMTP_FROM: z.string(),
})
