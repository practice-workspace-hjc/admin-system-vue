import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login as loginApi, logout as logoutApi, getUserInfo } from '@/api/auth'
import { getToken, setToken, removeToken, setRefreshToken } from '@/utils/auth'
import type { LoginParams, UserInfo } from '@/types/user'

export const useUserStore = defineStore('user', () => {
  // 状态
  const token = ref<string>(getToken() || '')
  const userInfo = ref<UserInfo | null>(null)

  // 计算属性
  const isLoggedIn = computed(() => !!token.value)
  const roles = computed(() => userInfo.value?.roles || [])
  const permissions = computed(() => userInfo.value?.permissions || [])
  const username = computed(() => userInfo.value?.username || '')
  const nickname = computed(() => userInfo.value?.nickname || '')
  const avatar = computed(() => userInfo.value?.avatar || '')

  // 登录
  const login = async (params: LoginParams) => {
    const data = await loginApi(params)
    token.value = data.token
    setToken(data.token)
    setRefreshToken(data.refreshToken)
    return data
  }

  // 获取用户信息
  const fetchUserInfo = async () => {
    const data = await getUserInfo()
    userInfo.value = data
    return data
  }

  // 登出
  const logout = async () => {
    try {
      await logoutApi()
    } finally {
      token.value = ''
      userInfo.value = null
      removeToken()
    }
  }

  // 重置状态
  const resetState = () => {
    token.value = ''
    userInfo.value = null
    removeToken()
  }

  return {
    token,
    userInfo,
    isLoggedIn,
    roles,
    permissions,
    username,
    nickname,
    avatar,
    login,
    logout,
    fetchUserInfo,
    resetState,
  }
})
