import { EVENT_BUS_SERVICE } from "@app/constants";
import { GetPost, GetPosts } from "@app/contracts";
import { Body, Controller, Get, Inject, Param } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { eventBusTopics } from "../../broker-clients/broker-clients.module";
import { Protected } from "../../../decorators";
import { UserRole } from "@app/types";

@Controller()
export class PostCommandController {
  constructor(@Inject(EVENT_BUS_SERVICE) private readonly client: ClientKafka) { }

  async onModuleInit() {
    const subscribeTopicKeys = eventBusTopics

    subscribeTopicKeys.forEach((topic) => this.client.subscribeToResponseOf(topic))

    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }


  @Get('posts/{id}')
  createPost(@Body() body: GetPost.Request) {
    return this.client.send<GetPost.Response, GetPost.Request>(GetPost.topic, body)
  }

  @Protected({
    allowedRoles: [UserRole.ADMIN]
  })
  @Get('posts')
  deleteFile(@Param() params: GetPosts.Request) {
    return this.client.send<GetPosts.Response, GetPosts.Request>(GetPosts.topic, params)
  }
}
