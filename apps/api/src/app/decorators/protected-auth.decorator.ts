import { SetMetadata } from '@nestjs/common';
import { AuthDecoratorKey, AllowedAuthUserAttributes } from '@app/types';

export const Protected = (
  allowedAuthUserAttributes: AllowedAuthUserAttributes,
) => SetMetadata(AuthDecoratorKey.PROTECTED, allowedAuthUserAttributes);
