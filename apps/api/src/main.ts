import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);

  const configService = app.get(ConfigService);

  const port = configService.getOrThrow('PORT')

  await app.listen(port);

  Logger.log(
    `🚀 Api is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
