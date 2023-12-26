import { verifyAuthCodeSchema } from '@app/validators'
import { z } from 'nestjs-zod/z'

export namespace VerifyAuthCode {
  export const topic = 'auth-code.command.verify'

  export type Request = z.infer<typeof verifyAuthCodeSchema>
}
