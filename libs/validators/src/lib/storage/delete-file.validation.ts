import { z } from 'nestjs-zod/z'

export const deleteUserFileSchema = z.object({
  userId: z.string().uuid(),
  fileId: z.string().uuid()
})

export const deleteFile = z.object({
  fileId: z.string().uuid()
})
