import { Module } from '@nestjs/common';
import { AppConfigModule } from './configs';
import { ModulesModule } from './modules/modules.module';
import { ExceptionModule } from '@app/utils';

@Module({
  imports: [
    AppConfigModule,
    ExceptionModule.register(),
    ModulesModule.forRoot()
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
