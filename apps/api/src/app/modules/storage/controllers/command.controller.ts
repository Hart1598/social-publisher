import { EVENT_BUS_SERVICE } from "@app/constants";
import { CreateUploadURL } from "@app/contracts";
import { CreateUploadUrlPayloadDto } from "@app/dtos";
import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { eventBusTopics } from "../../broker-clients/broker-clients.module";
import { User } from "../../../decorators";
import { JWTUser } from "@app/types";

@Controller()
export class StorageCommandController {
  constructor(@Inject(EVENT_BUS_SERVICE) private readonly client: ClientKafka) { }

  async onModuleInit() {
    const subscribeTopicKeys = eventBusTopics

    subscribeTopicKeys.forEach((topic) => this.client.subscribeToResponseOf(topic))

    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }


  @Post('storage/upload/url')
  signUpAdmin(@Body() body: CreateUploadUrlPayloadDto, @User() user: JWTUser) {
    return this.client.send<CreateUploadURL.Response, CreateUploadURL.Request>(CreateUploadURL.topic, {
      ...body,
      userId: user.id
    })
  }
}
