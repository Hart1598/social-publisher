import { AccountProvider } from '@app/types'
import { z } from 'nestjs-zod/z'

export const onSuccessSignIn = z.object({
  provider: z.nativeEnum(AccountProvider),
  providerId: z.string(),
  accessToken: z.string(),
  refreshToken: z.string().optional(),
  expiredAt: z.date(),
  userId: z.string(),
})

