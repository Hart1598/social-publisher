import { CreateUser, RefreshToken, SignIn, SignUp, SignUpAdmin } from '@app/contracts';
import { SignUpDto, SignInDto, SignUpAdminDto } from '@app/dtos';
import { Controller, Inject } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from '../services';
import { UserRole } from '@app/types';
import { EVENT_BUS_SERVICE } from '@app/constants';

@Controller()
export class AuthorizeCommandController  {
  constructor(
    private readonly authService: AuthService,
    @Inject(EVENT_BUS_SERVICE) private readonly client: ClientKafka
    ) {}

  @MessagePattern(SignIn.topic)
  async signIn(@Payload() params: SignInDto): Promise<SignIn.Response> {
    const { email, password } = params;

    const tokens = await this.authService.loginByEmail({ email, password })

    return tokens;
  }

  @MessagePattern(SignUp.topic)
  async signUp(@Payload() params: SignUpDto): Promise<SignUp.Response> {
    const { email, password, username } = params;

    const { accessToken, user } = await this.authService.registerByEmail({ email, password, username })

    this.client.emit<void, CreateUser.Request>(CreateUser.topic, user.toPublic())

    return {
      accessToken
    };
  }

  @MessagePattern(SignUpAdmin.topic)
  async signUpAdmin(@Payload() params: SignUpAdminDto): Promise<SignUpAdmin.Response> {
    const { email, password, username } = params;

    const { accessToken, user } = await this.authService.registerByEmail({ email, password, username, role: UserRole.ADMIN })

    this.client.emit<void, CreateUser.Request>(CreateUser.topic, user.toPublic())

    return {
      accessToken
    };
  }

  @MessagePattern(RefreshToken.topic)
  async refreshToken(@Payload() params: RefreshToken.Request): Promise<RefreshToken.Response> {
    const { userId } = params;

    const tokens = await this.authService.refreshTokenByUserId(userId)

    return tokens;
  }
}
