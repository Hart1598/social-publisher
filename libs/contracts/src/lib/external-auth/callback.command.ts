import { callbackRequestSchema, tiktokCallbackRequestSchema } from '@app/validators'
import { z } from 'nestjs-zod/z'

export namespace GoogleCallback {
  export const topic = 'auth-external.command.google-callback'

  export type Request = z.infer<typeof callbackRequestSchema>

  export type Response = void;
}

export namespace TikTokCallback {
  export const topic = 'auth-external.command.tiktok-callback'

  export type Request = z.infer<typeof tiktokCallbackRequestSchema>

  export type Response = void;
}
