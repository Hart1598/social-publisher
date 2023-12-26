import { PublicUser } from "./user.types";

export type EmailNotification = VerifyEmailNotification;

export interface VerifyEmailNotification {
  code: number;
  user: PublicUser;
}
