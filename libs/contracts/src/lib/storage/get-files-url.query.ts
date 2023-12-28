import { z } from 'nestjs-zod/z'
import { getFilesUrl } from '@app/validators'
import { FileUrlPayload } from '@app/types';

export namespace GetFilesURL {
  export const topic = 'storage.query.get-files-url'

  export type Request = z.infer<typeof getFilesUrl>

  export type Response = FileUrlPayload;
}
