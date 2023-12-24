import { SignIn, SignUp } from '@app/contracts';
import { SignInDto, SignUpDto } from '@app/dtos';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthorizeCommandController  {


  @MessagePattern(SignIn.topic)
  signIn(@Payload() params: SignInDto) {
    console.log(params)
    return null;
  }

  @MessagePattern(SignUp.topic)
  signUp(@Payload() params: SignUpDto) {
    console.log(params)
    return null;
  }
}
