import { Controller } from "@nestjs/common";
import { GoogleAuthService } from "../services";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { GoogleCallback, GoogleSignInUrl } from "@app/contracts";

@Controller()
export class GoogleCommandController {
  constructor(
    private readonly googleAuthService: GoogleAuthService,
    ) {}

  @MessagePattern(GoogleSignInUrl.topic)
  async signInUrl(): Promise<GoogleSignInUrl.Response> {
    const url = this.googleAuthService.generateAuthUrl()

    return {
      url
    }
  }

  @MessagePattern(GoogleCallback.topic)
  async callback(@Payload() params: GoogleCallback.Request): Promise<GoogleCallback.Response> {
    const { code } = params;

    const tokens = await this.googleAuthService.authByCode(code);

    return null;
  }
}
