import { z } from 'nestjs-zod/z'

export const createUploadUrlSchema = z.object({
  userId: z.string(),
  contentType: z.string(),
})

export const createUploadUrlPayloadSchema= z.object({
  contentType: z.string(),
})
