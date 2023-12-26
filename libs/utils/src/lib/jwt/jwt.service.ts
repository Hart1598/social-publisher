import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWTUser } from '@app/types';

export interface JWTParams {
  secret: string;
  expiresIn: string;
}

export const JWT_PARAMS = 'JWT_PARAMS';

@Injectable()
export class JwtTokenService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(JWT_PARAMS) private readonly params: JWTParams
  ) {}

  async checkToken(token: string): Promise<JWTUser> {
    const decode = await this.jwtService.verifyAsync(token);
    return decode;
  }

  createToken(payload: JWTUser): Promise<string> {
    const { secret, expiresIn } = this.params;

    return this.jwtService.signAsync(payload, {
      secret: secret,
      expiresIn: expiresIn,
    });
  }
}
