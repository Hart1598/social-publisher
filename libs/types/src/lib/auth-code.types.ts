export interface IAuthCode {
  id: string;
  code: number;
  userId: string;
  expiresAt: Date;
}
