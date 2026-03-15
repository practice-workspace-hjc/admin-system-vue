import { request } from './index'
import type { LoginParams, LoginResult, UserInfo } from '@/types'

// 登录
export const login = (data: LoginParams) => {
  return request.post<LoginResult>('/auth/login', data)
}

// 登出
export const logout = () => {
  return request.post('/auth/logout')
}

// 获取用户信息
export const getUserInfo = () => {
  return request.get<UserInfo>('/auth/userInfo')
}

// 刷新 Token
export const refreshToken = () => {
  return request.post<{ token: string; refreshToken: string }>('/auth/refresh')
}
