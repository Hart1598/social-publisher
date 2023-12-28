import { File } from '@app/types';
import { getUserFiles } from '@app/validators';
import { z } from 'zod';

export namespace GetUserFiles {
  export const topic = 'storage.query.get-user-files'

  export type Request = z.infer<typeof getUserFiles>

  export type Response = File[];
}
