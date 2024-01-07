import { Controller, Get, Inject, Post, Query } from "@nestjs/common";
import { eventBusTopics } from "../../broker-clients/broker-clients.module";
import { ClientKafka } from "@nestjs/microservices";
import { EVENT_BUS_SERVICE } from "@app/constants";
import { GoogleCallback, GoogleSignInUrl } from "@app/contracts";
import { Public, User } from "../../../decorators";
import { JWTUser } from "@app/types";

@Controller()
export class ExternalAuthCommandController {
  constructor(@Inject(EVENT_BUS_SERVICE) private readonly client: ClientKafka) { }

  async onModuleInit() {
    const subscribeTopicKeys = eventBusTopics

    subscribeTopicKeys.forEach((topic) => this.client.subscribeToResponseOf(topic))

    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  @Post('external-auth/google/auth')
  googleSignInUrl(@User() user: JWTUser) {
    return this.client.send<GoogleSignInUrl.Response, GoogleSignInUrl.Request>(GoogleSignInUrl.topic, {
      userId: user.id
    })
  }

  @Public()
  @Get('external-auth/google/callback')
  googleCallback(@Query('code') code: string, @Query('state') state: string) {
    return this.client.send<GoogleCallback.Response, GoogleCallback.Request>(GoogleCallback.topic, { code, userId: state })
  }
}
