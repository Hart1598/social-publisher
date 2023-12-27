import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { PubSub } from '@google-cloud/pubsub';
import { ConfigService } from '@nestjs/config';
import { StorageEvent, StorageEventType } from '@app/types';
import { EVENT_BUS_SERVICE } from '@app/constants';
import { ClientKafka } from '@nestjs/microservices';
import { StorageUpdate } from '@app/contracts';

@Injectable()
export class PublicStorageListenerService implements OnModuleInit {
  private pubSubClient = new PubSub();
  private subscriptionName;

  constructor(
    private readonly configService: ConfigService,
    @Inject(EVENT_BUS_SERVICE) private readonly client: ClientKafka
  ) {
    const subscriptionName = this.configService.getOrThrow<string>('PUBLIC_PUBSUB_STORAGE_SUBSCRIPTION_NAME');

    this.subscriptionName = subscriptionName;
  }

  onModuleInit() {
    this.subscribeToStorageEvents();
  }

  private subscribeToStorageEvents() {
    const subscription = this.pubSubClient.subscription(this.subscriptionName);

    subscription.on('message', message => {
      const event: StorageEvent = {
        messageId: message.id,
        eventType: message.attributes.eventType as StorageEventType,
        bucketId: message.attributes.bucketId,
        objectGeneration: message.attributes.objectGeneration,
        eventTime: message.attributes.eventTime,
        publishTime: message.publishTime.toISOString()
      }

      this.onStorageEvent(event);

      message.ack();
    });

    subscription.on('error', error => {
      console.error('Error in Pub/Sub subscription:', error);
      this.subscribeToStorageEvents()
    });
  }

  private onStorageEvent(event: StorageEvent) {
    this.client.emit(StorageUpdate.topic, event)
  }
}
