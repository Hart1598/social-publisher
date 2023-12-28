import { z } from 'nestjs-zod/z'
import { deleteFile } from '@app/validators'

export namespace DeleteFile {
  export const topic = 'storage.command.delete-file'

  export type Request = z.infer<typeof deleteFile>

  export type Response = void;
}
