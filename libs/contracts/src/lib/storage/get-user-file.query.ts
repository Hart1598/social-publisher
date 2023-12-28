import { z } from 'nestjs-zod/z'
import { File } from '@app/types';
import { getUserFileSchema } from '@app/validators';

export namespace GetUserFile {
  export const topic = 'storage.query.get-user-file'

  export type Request = z.infer<typeof getUserFileSchema>

  export type Response = File;
}
