import { GetUserById, GetUserList } from '@app/contracts';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from '../services/user.service';

@Controller()
export class UserQueryController  {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(GetUserById.topic)
  async getUserById(@Payload() params: GetUserById.Request): Promise<GetUserById.Response> {
    const { userId } = params;

    const user = await this.userService.findById(userId)

    return user.toPublic();
  }

  @MessagePattern(GetUserList.topic)
  async getUserList(@Payload() params: GetUserList.Request): Promise<GetUserList.Response> {
    const { take = 10, skip = 0 } = params;

    const [users, total] = await this.userService.findAndCount(take, skip)

    const publicUsers = users.map((user) => user.toPublic())

    return {
      users: publicUsers,
      total,
    }
  }
}
