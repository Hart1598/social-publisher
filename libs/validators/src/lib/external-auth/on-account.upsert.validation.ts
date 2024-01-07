import { TokenType } from '@app/types'
import { z } from 'nestjs-zod/z'

export const tokenPayload = z.object({
  type: z.nativeEnum(TokenType),
  token: z.string(),
  name: z.string(),
  expiresAt: z.date(),
})

export const tokenRecordPayload = z.record(tokenPayload)

export const onAccountUpsert = z.object({
  accountId: z.string(),
  payload: tokenRecordPayload,
})

