import { googleSingInUrlResponseSchema, googleSingInUrlRequestSchema } from '@app/validators'
import { z } from 'nestjs-zod/z'

export namespace GoogleSignInUrl {
  export const topic = 'auth-external.command.google-sign-in-url'

  export type Request = z.infer<typeof googleSingInUrlRequestSchema>

  export type Response = z.infer<typeof googleSingInUrlResponseSchema>
}


export namespace TikTokSignInUrl {
  export const topic = 'auth-external.command.tiktok-sign-in-url'

  export type Request = z.infer<typeof googleSingInUrlRequestSchema>

  export type Response = z.infer<typeof googleSingInUrlResponseSchema>
}
