import { PublicUser } from '@app/types'

export namespace CreateUser {
  export const topic = 'user.event.create-user'

  export type Request = PublicUser
}
