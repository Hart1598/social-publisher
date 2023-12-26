import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { getConfigModule } from './get-config-module';
import { AuthGuard } from '../guards';
import { JwtAuthStrategy } from '../strategies';
import { PassportModule } from '@nestjs/passport';
import { AuthStrategyType } from '@app/types';

@Module({
  imports: [
    ConfigModule.forRoot(getConfigModule()),
    PassportModule.registerAsync({
      useFactory: () => {
        return {
          defaultStrategy: AuthStrategyType.JWT_AUTH
        }
      }
    }),
  ],
  controllers: [],
  providers: [
    JwtAuthStrategy,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppConfigModule {}
