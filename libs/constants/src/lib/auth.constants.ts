import { AllowedAuthUserAttributeKey, AllowedAuthUserAttributes, UserRole, UserStatus } from "@app/types";

export const AUTH_SERVICE = 'AUTH_SERVICE'

export const AUTH_SERVICE_CLIENT = 'AUTH_SERVICE_CLIENT'

export const AUTH_CONSUMER_GROUP_ID = 'AUTH_CONSUMER_GROUP_ID'

export const ALLOWED_ATTRIBUTES_KEYS: AllowedAuthUserAttributeKey[] = [
  'allowedRoles',
  'allowedStatuses',
];

export const DEFAULT_ALLOWED_ATTRIBUTES: AllowedAuthUserAttributes = {
  allowedRoles: [
    UserRole.ADMIN,
    UserRole.USER,
  ],
  allowedStatuses: [UserStatus.ACTIVE],
};
