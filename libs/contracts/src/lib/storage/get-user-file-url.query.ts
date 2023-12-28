import { z } from 'nestjs-zod/z'
import { getUserFileUrl } from '@app/validators'
import { FileUrlPayload } from '@app/types';

export namespace GetUserFileURL {
  export const topic = 'storage.query.get-user-file-url'

  export type Request = z.infer<typeof getUserFileUrl>

  export type Response = FileUrlPayload;
}
