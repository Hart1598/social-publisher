import { z } from 'nestjs-zod/z'
import { getFiles } from '@app/validators'
import { File } from '@app/types';

export namespace GetFiles {
  export const topic = 'storage.query.get-files'

  export type Request = z.infer<typeof getFiles>

  export type Response = File[];
}
