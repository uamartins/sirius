type NotificationType = 'error' | 'info' | 'success'

export type Notification = {
  message: string
  type: NotificationType
  show: boolean
}
