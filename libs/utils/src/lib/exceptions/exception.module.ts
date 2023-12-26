import { DynamicModule, Module, Global } from '@nestjs/common';
import { ExceptionService } from './exception.service';


@Global()
@Module({})
export class ExceptionModule {
  static register(): DynamicModule {
    return {
      module: ExceptionModule,
      providers: [ExceptionService],
      exports: [ExceptionService],
    };
  }
}
