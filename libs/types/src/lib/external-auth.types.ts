export enum AccountEnum {
  GOOGLE = 'google',
  TIKTOK = 'tiktok',
}

export enum AccountStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired'
}

export interface Account {
  id: string;
  userId: string;
  provider: AccountEnum;
  status: AccountStatus;
  expiresAt: Date;
}

export interface AccountToken {
  id: string;
  accountId: string;
  tokenHash: string;
  name: string;
}
