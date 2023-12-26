import { SetMetadata } from '@nestjs/common';
import { AuthDecoratorKey } from '@app/types';

export const Public = () => SetMetadata(AuthDecoratorKey.PUBLIC, true);
