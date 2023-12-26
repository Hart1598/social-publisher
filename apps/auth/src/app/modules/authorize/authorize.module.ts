import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthorizeCommandController } from './controllers';
import { UserModule } from '../user/user.module';
import { JwtTokenModule } from '@app/utils';
import { AuthService } from './services';
import { CryptoService } from './services/crypto.service';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    JwtTokenModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret = configService.getOrThrow<string>('JWT_TOKEN_SECRET');

        return {
          secret,
          signOptions: {
            expiresIn: configService.getOrThrow<string>('JWT_TOKEN_EXPIRATION_TIME'),
          },
        };
      },
    }),
  ],
  controllers: [AuthorizeCommandController],
  providers: [AuthService, CryptoService],
})
export class AuthorizeModule {}
