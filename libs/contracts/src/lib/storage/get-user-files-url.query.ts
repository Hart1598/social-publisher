import { z } from 'nestjs-zod/z'
import { getUserFilesUrl } from '@app/validators'
import { FileUrlPayload } from '@app/types';

export namespace GetUserFilesURL {
  export const topic = 'storage.query.get-user-files-url'

  export type Request = z.infer<typeof getUserFilesUrl>

  export type Response = FileUrlPayload;
}
