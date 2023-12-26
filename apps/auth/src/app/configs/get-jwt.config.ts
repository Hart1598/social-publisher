import { ConfigModule, ConfigService } from "@nestjs/config";

export const getJwtConfig = () => {
  return {
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
  }
}
