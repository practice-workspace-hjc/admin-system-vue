import { worker } from './browser'

// 在开发环境启动 MSW
export async function setupMock() {
  return worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: `${import.meta.env.BASE_URL.endsWith("/") ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`}mockServiceWorker.js`,
    }
  })
}
