import { Controller, Post } from "@nestjs/common";

@Controller()
export class AuthCommandController {
  constructor () {}

  @Post('/auth/authorize/sign-in')
  signIn() {

  }

  @Post('/auth/authorize/sign-up')
  signUp() {

  }

}
