import { z } from 'nestjs-zod/z'
import { stringToNumber } from '../transforms'

export const getUserListSchema = z.object({
  skip: stringToNumber,
  take: stringToNumber.pipe(z.number().max(50))
})
