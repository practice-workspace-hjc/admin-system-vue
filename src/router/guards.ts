import router from './index'
import { useUserStore } from '@/stores/user'
import { getToken } from '@/utils/auth'

// 白名单路由
const whiteList = ['/login', '/404']

router.beforeEach(async (to, _from, next) => {
  // 设置页面标题
  document.title = `${to.meta.title || ''} - ${import.meta.env.VITE_APP_TITLE}`

  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // 已登录，跳转到首页
      next({ path: '/' })
    } else {
      const userStore = useUserStore()

      if (userStore.userInfo) {
        // 已有用户信息，直接放行
        next()
      } else {
        try {
          // 获取用户信息
          await userStore.fetchUserInfo()
          next()
        } catch (error) {
          // 获取用户信息失败，清除 token 并跳转登录页
          userStore.resetState()
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    // 没有 token
    if (whiteList.includes(to.path)) {
      // 在白名单中，直接放行
      next()
    } else {
      // 不在白名单中，跳转登录页
      next(`/login?redirect=${to.path}`)
    }
  }
})

export default router
