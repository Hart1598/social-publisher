import { Module } from '@nestjs/common';
import { AppConfigModule } from './configs';
import { ModulesModule } from './modules';

@Module({
  imports: [AppConfigModule, ModulesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
