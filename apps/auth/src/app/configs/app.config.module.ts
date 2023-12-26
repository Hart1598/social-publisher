import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { getConfigModule } from './get-config-module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeormConfig } from './get-typeorm-config';

@Module({
  imports: [
    ConfigModule.forRoot(getConfigModule()),
    TypeOrmModule.forRootAsync(getTypeormConfig())
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppConfigModule {}
