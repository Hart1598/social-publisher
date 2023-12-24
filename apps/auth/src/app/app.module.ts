import { Module } from '@nestjs/common';
import { AppConfigModule } from './configs';
import { ModulesModule } from './modules/modules.module';
@Module({
  imports: [AppConfigModule, ModulesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
