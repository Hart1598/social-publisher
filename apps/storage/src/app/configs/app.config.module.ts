import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getConfigModule } from './get-config-module';
import { getTypeormConfig } from './get-typeorm-config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(getConfigModule()),
    TypeOrmModule.forRootAsync(getTypeormConfig())
  ],
  controllers: [],
})
export class AppConfigModule {}
