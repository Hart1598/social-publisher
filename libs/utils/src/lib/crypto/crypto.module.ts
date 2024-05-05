import { Module, DynamicModule } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { CryptoModuleOptions } from './types';

@Module({})
export class CryptoModule {
  static forRoot(options: CryptoModuleOptions): DynamicModule {
    return {
      module: CryptoModule,
      providers: [
        {
          provide: 'CRYPTO_OPTIONS',
          useValue: options,
        },
        CryptoService,
      ],
      exports: [CryptoService],
    };
  }
}
