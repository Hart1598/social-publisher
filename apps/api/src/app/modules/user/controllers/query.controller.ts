import { EVENT_BUS_SERVICE } from "@app/constants";
import { GetUserById, GetUserList } from "@app/contracts";
import { Controller, Get, Inject, Param, Query } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { Protected, User } from "../../../decorators";
import { JWTUser, UserRole } from "@app/types";
import { GetUserByIdDto, GetUserListDto } from "@app/dtos";
import { authServiceTopics } from "../../broker-clients/broker-clients.module";


@Controller()
export class UserQueryController {
  constructor(@Inject(EVENT_BUS_SERVICE) private readonly client: ClientKafka) { }

  async onModuleInit() {
    const subscribeTopicKeys = authServiceTopics;

    subscribeTopicKeys.forEach((topic) => this.client.subscribeToResponseOf(topic))

    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }


  @Protected({
    allowedRoles: [UserRole.ADMIN]
  })
  @Get('admin/auth/user/:userId')
  getUserById(@Param() params: GetUserByIdDto) {
    const { userId } = params;

    return this.client.send<GetUserById.Response, GetUserById.Request>(GetUserById.topic,
      {
      userId,
    })
  }

  @Protected({
    allowedRoles: [UserRole.USER, UserRole.ADMIN]
  })
  @Get('auth/user/me')
  getCurrentUser(@User() user: JWTUser) {
    const userId = user.id;

    return this.client.send<GetUserById.Response, GetUserById.Request>(GetUserById.topic,
      {
      userId,
    }
    )
  }

  @Protected({
    allowedRoles: [UserRole.ADMIN]
  })
  @Get('auth/user/list')
  getUserList(@Query() query: GetUserListDto) {
    return this.client.send<GetUserList.Response, GetUserList.Request>(GetUserList.topic,
      query
    )
  }
}
