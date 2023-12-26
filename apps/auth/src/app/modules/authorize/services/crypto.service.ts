import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {
  saltRounds: number;

  constructor(configService: ConfigService) {
    this.saltRounds = Number(configService.getOrThrow<string>('CRYPTO_HASH_SALT'))
  }

  async hash(payload: string): Promise<string> {
    return bcrypt.hash(payload, this.saltRounds);
  }

  async compare(payload: string, hashedPayload: string): Promise<boolean> {
    return bcrypt.compare(payload, hashedPayload);
  }
}
