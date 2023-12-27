import { AllowedAuthUserAttributeKey, AllowedAuthUserAttributes, UserRole, UserStatus } from "@app/types";

export const EVENT_BUS_SERVICE = 'EVENT_BUS_SERVICE'

export const EVENT_BUS_SERVICE_CLIENT = 'EVENT_BUS_SERVICE_CLIENT'

export const AUTH_CONSUMER_GROUP_ID = 'AUTH_CONSUMER_GROUP_ID'

export const NOTIFICATION_CONSUMER_GROUP_ID = 'NOTIFICATION_CONSUMER_GROUP_ID'

export const STORAGE_CONSUMER_GROUP_ID = 'STORAGE_CONSUMER_GROUP_ID'

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
