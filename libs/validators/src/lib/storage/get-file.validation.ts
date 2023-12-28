import { z } from 'nestjs-zod/z'

export const getUserFileSchema = z.object({
  userId: z.string().uuid(),
  fileId: z.string().uuid()
})

export const getFile = z.object({
  fileId: z.string().uuid()
})

export const getFiles = z.object({
  fileIds: z.array(z.string().uuid())
})

export const getUserFiles = z.object({
  userId: z.string().uuid(),
})

export const getFileUrl = z.object({
  fileId: z.string().uuid()
})

export const getFilesUrl = z.object({
  fileIds: z.array(z.string().uuid())
})

export const getUserFileUrl = z.object({
  fileId: z.string().uuid(),
  userId: z.string().uuid(),
})

export const getUserFilesUrl = z.object({
  fileIds: z.array(z.string().uuid()),
  userId: z.string().uuid(),
})

