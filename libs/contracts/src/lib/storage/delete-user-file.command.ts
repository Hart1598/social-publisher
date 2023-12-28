import { z } from 'nestjs-zod/z'
import { deleteUserFileSchema } from '@app/validators'

export namespace DeleteUserFile {
  export const topic = 'storage.command.delete-user-file'

  export type Request = z.infer<typeof deleteUserFileSchema>

  export type Response = void;
}
