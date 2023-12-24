import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthorizeCommandController } from './controllers';


@Module({
  imports: [
    ConfigModule,
  ],
  controllers: [AuthorizeCommandController],
  providers: [],
})
export class AuthorizeModule {}
