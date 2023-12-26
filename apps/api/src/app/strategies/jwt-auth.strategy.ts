import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthStrategyType, JWTUser } from '@app/types';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(
  Strategy,
  AuthStrategyType.JWT_AUTH,
) {
  constructor(
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.getOrThrow<string>('JWT_TOKEN_SECRET'),
    });
  }

  async validate(user: JWTUser) {
    try {
      if(!user) throw Error()

      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
