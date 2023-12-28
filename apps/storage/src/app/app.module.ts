import { Module } from '@nestjs/common';
import { AppConfigModule } from './configs';
import { ModulesModule } from './modules/modules.module';
import { ExceptionModule } from '@app/utils';


@Module({
  imports: [AppConfigModule, ModulesModule, ExceptionModule.register()],
  controllers: [],
  providers: [],
})
export class AppModule {}
