import { Module } from '@nestjs/common';
import { AppConfigModule } from './configs';


@Module({
  imports: [AppConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
