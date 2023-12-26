import { z } from 'nestjs-zod/z'
import { stringToNumber } from '../transforms'

export const code = stringToNumber.pipe(z.number())

export const verifyAuthCodeSchema = z.object({
  userId: z.string(),
  code: code
})

export const codeSchema = z.object({
  code: code
})
