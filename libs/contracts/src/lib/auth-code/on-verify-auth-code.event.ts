
export namespace OnVerifyAuthCode {
  export const topic = 'auth-code.event.verify'

  export type Request = {
    userId: string;
  }
}
