import { SignIn, SignUp, SignUpAdmin } from '@app/contracts';
import { SignUpDto, SignInDto, SignUpAdminDto } from '@app/dtos';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from '../services';
import { UserRole } from '@app/types';

@Controller()
export class AuthorizeCommandController  {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(SignIn.topic)
  async signIn(@Payload() params: SignInDto): Promise<SignIn.Response> {
    const { email, password } = params;

    const tokens = await this.authService.loginByEmail({ email, password })

    return tokens;
  }

  @MessagePattern(SignUp.topic)
  async signUp(@Payload() params: SignUpDto): Promise<SignIn.Response> {
    const { email, password, username } = params;

    const tokens = await this.authService.registerByEmail({ email, password, username })

    return tokens;
  }

  @MessagePattern(SignUpAdmin.topic)
  async signUpAdmin(@Payload() params: SignUpAdminDto): Promise<SignIn.Response> {
    const { email, password, username } = params;

    const tokens = await this.authService.registerByEmail({ email, password, username, role: UserRole.ADMIN })

    return tokens;
  }
}
