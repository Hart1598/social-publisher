import { EVENT_BUS_SERVICE } from "@app/constants";
import {  GetFile, GetFiles, GetUserFile, GetUserFilesURL, GetUserFiles } from "@app/contracts";
import {  GetFileDto, GetFilesDto, GetFilesUrlDto, GetUserFilesUrlDto } from "@app/dtos";
import { Query, Controller, Get, Inject } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { eventBusTopics } from "../../broker-clients/broker-clients.module";
import { Protected, User } from "../../../decorators";
import { JWTUser, UserRole } from "@app/types";

@Controller()
export class StorageQueryController {
  constructor(@Inject(EVENT_BUS_SERVICE) private readonly client: ClientKafka) { }

  async onModuleInit() {
    const subscribeTopicKeys = eventBusTopics

    subscribeTopicKeys.forEach((topic) => this.client.subscribeToResponseOf(topic))

    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }


  @Protected({
    allowedRoles: [UserRole.ADMIN]
  })
  @Get('admin/storage/file/metadata')
  getFileMetadata(@Query() Query: GetFileDto) {
    return this.client.send<GetFile.Response, GetFile.Request>(GetFile.topic, Query)
  }

  @Get('storage/file/metadata')
  getUserFileMetadata(@Query() Query: GetFileDto, @User() user: JWTUser) {
    return this.client.send<GetUserFile.Response, GetUserFile.Request>(GetUserFile.topic, {
      ...Query,
      userId: user.id,
    })
  }

  @Protected({
    allowedRoles: [UserRole.ADMIN]
  })
  @Get('admin/storage/files/metadata')
  getFilesMetadata(@Query() Query: GetFilesDto) {
    return this.client.send<GetFiles.Response, GetFiles.Request>(GetFiles.topic, Query)
  }

  @Get('storage/files/metadata')
  getUserFiles(@User() user: JWTUser) {
    return this.client.send<GetUserFiles.Response, GetUserFiles.Request>(GetUserFiles.topic, {
      userId: user.id,
    })
  }

  @Get('storage/files/urls')
  getUserFileUrls(@Query() query: GetFilesUrlDto,  @User() user: JWTUser) {
    return this.client.send<GetUserFilesURL.Response, GetUserFilesURL.Request>(GetUserFilesURL.topic, {
      userId: user.id,
      fileIds: query.fileIds,
    })
  }

  @Protected({
    allowedRoles: [UserRole.ADMIN]
  })
  @Get('admin/storage/files/urls')
  getFileUrls(@Query() query: GetUserFilesUrlDto) {
    return this.client.send<GetUserFilesURL.Response, GetUserFilesURL.Request>(GetUserFilesURL.topic, query)
  }
}
