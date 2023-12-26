import { z } from 'nestjs-zod/z'

export const refreshTokenSchema = z.object({
  userId: z.string()
});
