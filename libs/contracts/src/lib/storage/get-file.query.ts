import { z } from 'nestjs-zod/z'
import { getFile } from '@app/validators'
import { File } from '@app/types';

export namespace GetFile {
  export const topic = 'storage.query.get-file'

  export type Request = z.infer<typeof getFile>

  export type Response = File;
}
