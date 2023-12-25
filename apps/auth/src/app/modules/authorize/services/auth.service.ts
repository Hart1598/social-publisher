import { ConflictException, ForbiddenException, Injectable } from "@nestjs/common";
import { UserService } from "../../user/services/user.service";
import { JwtTokenService } from "@app/utils";
import { CryptoService } from "./crypto.service";
import { UserRole, UserStatus } from "@app/types";

export interface RegisterByEmailParams {
  username: string;
  password: string;
  email: string;
  role?: UserRole;
  status?: UserStatus;
}

export interface LoginByEmailParams {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtTokenService: JwtTokenService,
    private readonly cryptoService: CryptoService,
    ) {}

  async registerByEmail(params: RegisterByEmailParams) {
    const { email, username, password, role = UserRole.USER, status = UserStatus.ACTIVE } = params;

    const isExist = await this.userService.isExistByEmail(email);

    if(isExist) throw new ConflictException()

    const passwordHash = await this.cryptoService.hash(password)

    const candidate = this.userService.create({ email, username, passwordHash, role, status });

    const user = await this.userService.save(candidate);

    const accessToken = await this.jwtTokenService.createToken(user.toJWT())

    return {
      accessToken
    }
  }

  async loginByEmail(params: LoginByEmailParams) {
    const { email, password } = params;

    const user = await this.userService.findByEmail(email);

    if(user) throw new ConflictException()

    const isValidPassword = await this.cryptoService.compare(password, user.passwordHash);

    if(!isValidPassword) throw new ForbiddenException()

    const accessToken = await this.jwtTokenService.createToken(user.toJWT())

    return {
      accessToken
    }
  }
}
