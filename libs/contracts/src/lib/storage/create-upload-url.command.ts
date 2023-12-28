import { z } from 'nestjs-zod/z'
import { createUploadUrlSchema } from '@app/validators'

export namespace CreateUploadURL {
  export const topic = 'storage.command.create-upload-url'

  export type Request = z.infer<typeof createUploadUrlSchema>

  export type Response = {
    url: string;
    id: string;
  };
}
