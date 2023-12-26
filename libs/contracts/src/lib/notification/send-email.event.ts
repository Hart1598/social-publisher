import { EmailNotification } from '@app/types'

export namespace SendEmailNotification {
  export const topic = 'notification.event.send-email'

  export type Request = EmailNotification
}
