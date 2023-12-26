import { UserRole, UserStatus } from "./user.types";

export interface JWTUser {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}

export enum AuthDecoratorKey {
  PUBLIC = 'isPublic',
  PROTECTED = 'isProtected',
}

export type AllowedAuthUserAttributes = {
  allowedRoles?: UserRole[];
  allowedStatuses?: UserStatus[];
};

export type AllowedAuthUserAttributeKey = keyof AllowedAuthUserAttributes;

export enum AuthStrategyType {
  JWT_AUTH = 'jwt-auth',
}

