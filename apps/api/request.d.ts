// eslint-disable-next-line @nx/enforce-module-boundaries
import { JWTUser } from "../../libs/types/src";

declare namespace Express {
  interface Request {
    user: JWTUser
  }
}
