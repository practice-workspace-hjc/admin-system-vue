import { worker } from './browser'

// 在开发环境启动 MSW
export async function setupMock() {
  if (import.meta.env.DEV) {
    return worker.start({
      onUnhandledRequest: 'bypass',
    })
  }
  return Promise.resolve()
}
