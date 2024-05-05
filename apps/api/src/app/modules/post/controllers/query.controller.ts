import { EVENT_BUS_SERVICE } from "@app/constants";
import { CreatePost, RemovePost, UpdatePost } from "@app/contracts";
import { Body, Controller, Delete, Inject, Param, Patch, Post } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { eventBusTopics } from "../../broker-clients/broker-clients.module";
import { Protected } from "../../../decorators";
import { UserRole } from "@app/types";

@Controller()
export class PostQueryController {
  constructor(@Inject(EVENT_BUS_SERVICE) private readonly client: ClientKafka) { }

  async onModuleInit() {
    const subscribeTopicKeys = eventBusTopics

    subscribeTopicKeys.forEach((topic) => this.client.subscribeToResponseOf(topic))

    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }


  @Post('posts')
  createPost(@Body() body: CreatePost.Request) {
    return this.client.send<CreatePost.Response, CreatePost.Request>(CreatePost.topic, body)
  }

  @Protected({
    allowedRoles: [UserRole.ADMIN]
  })
  @Delete('posts/{id}')
  deleteFile(@Param() params: RemovePost.Request) {
    return this.client.send<RemovePost.Response, RemovePost.Request>(RemovePost.topic, {
      id: params.id
    })
  }

  @Patch('posts')
  deleteUserFile(@Param() params: UpdatePost.Request) {
    return this.client.send<UpdatePost.Response, UpdatePost.Request>(UpdatePost.topic, {
      ...params,
    })
  }
}
