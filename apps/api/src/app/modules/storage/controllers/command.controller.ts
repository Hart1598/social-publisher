import { EVENT_BUS_SERVICE } from "@app/constants";
import { CreateUploadURL, DeleteFile, DeleteUserFile } from "@app/contracts";
import { CreateUploadUrlPayloadDto, DeleteFileSchemaDto } from "@app/dtos";
import { Body, Controller, Delete, Inject, Param, Post } from "@nestjs/common";
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
  createUploadUrl(@Body() body: CreateUploadUrlPayloadDto, @User() user: JWTUser) {
    return this.client.send<CreateUploadURL.Response, CreateUploadURL.Request>(CreateUploadURL.topic, {
      ...body,
      userId: user.id
    })
  }

  @Delete('admin/storage/file/:fileId')
  deleteFile(@Param() params: DeleteFileSchemaDto) {
    return this.client.send<DeleteFile.Response, DeleteFile.Request>(DeleteFile.topic, params)
  }

  @Delete('storage/file/:fileId')
  deleteUserFile(@Param() params: DeleteFileSchemaDto, @User() user: JWTUser) {
    return this.client.send<DeleteUserFile.Response, DeleteUserFile.Request>(DeleteUserFile.topic, {
      ...params,
      userId: user.id,
    })
  }
}
