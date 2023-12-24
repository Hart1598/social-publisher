import { UserRole, UserStatus } from "./user.types";

export interface JWTUser {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}
