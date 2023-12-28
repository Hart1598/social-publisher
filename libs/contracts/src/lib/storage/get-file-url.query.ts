import { z } from 'nestjs-zod/z'
import { getFileUrl } from '@app/validators'
import { FileUrlPayload } from '@app/types';

export namespace GetFileURL {
  export const topic = 'storage.query.get-file-url'

  export type Request = z.infer<typeof getFileUrl>

  export type Response = FileUrlPayload;
}
