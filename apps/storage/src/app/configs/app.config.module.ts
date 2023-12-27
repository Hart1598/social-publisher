import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getConfigModule } from './get-config-module';

@Module({
  imports: [
    ConfigModule.forRoot(getConfigModule()),
  ],
  controllers: [],
})
export class AppConfigModule {}
