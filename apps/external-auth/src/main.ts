import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AUTH_EXTERNAL_CONSUMER_GROUP_ID } from '@app/constants';

async function bootstrap() {
  const broker = process.env.KAFKA_BROKER

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'external-auth',
          brokers: [broker],
        },
        consumer: {
          groupId: AUTH_EXTERNAL_CONSUMER_GROUP_ID
        }
      },
    },
  );

  await app.listen();

  Logger.log(
    `🚀 External auth microservices is running`
  );
}

bootstrap();
