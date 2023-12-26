import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserQueryController } from './controllers';
import { UserService } from './services';


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserQueryController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
