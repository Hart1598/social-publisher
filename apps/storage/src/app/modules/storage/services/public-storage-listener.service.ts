import { Injectable, OnModuleInit } from '@nestjs/common';
import { PubSub } from '@google-cloud/pubsub';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PublicStorageListenerService implements OnModuleInit {
  private pubSubClient = new PubSub();
  private subscriptionName;

  constructor(private readonly configService: ConfigService) {
    const subscriptionName = this.configService.getOrThrow<string>('PUBLIC_PUBSUB_STORAGE_SUBSCRIPTION_NAME');

    this.subscriptionName = subscriptionName;
  }

  onModuleInit() {
    this.subscribeToStorageEvents();
  }

  private subscribeToStorageEvents() {
    const subscription = this.pubSubClient.subscription(this.subscriptionName);

    subscription.on('message', message => {
      console.log('Received message:', message.data.toString());
      message.ack();
    });

    subscription.on('error', error => {
      console.error('Error in Pub/Sub subscription:', error);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handleStorageEvent(message: any) {
    const data = message.data ? JSON.parse(message.data.toString()) : null;
    console.log('Storage event:', data)
  }
}
