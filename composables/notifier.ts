import { ElNotification } from 'element-plus'

const notify = (title: string, message: string, type: 'success' | 'warning' | 'info' | 'error') => {
  ElNotification({
    title: title,
    message: message,
    type: type,
  })
}

export const useNotifier = () => {
  return {
    info(message: string) {
      notify('Informação', message, 'info')
    },
    success(message: string) {
      notify('Sucesso', message, 'success')
    },
    error(message: string) {
      notify('Error', message, 'error')
    },
    warning(message: string) {
      notify('Atenção', message, 'warning')
    },
  }
}
