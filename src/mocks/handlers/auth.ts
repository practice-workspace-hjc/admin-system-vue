import { http, HttpResponse, delay } from 'msw'
import type { ApiResponse, LoginResult, UserInfo } from '@/types'

const baseUrl = import.meta.env.VITE_API_BASE_URL

export const authHandlers = [
  // 登录
  http.post(`${baseUrl}/auth/login`, async ({ request }) => {
    await delay(500)
    await request.json()

    // 模拟任意账号都能登录
    const data: LoginResult = {
      token: `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      refreshToken: `mock_refresh_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    }

    const response: ApiResponse<LoginResult> = {
      code: 0,
      message: '登录成功',
      data,
    }

    return HttpResponse.json(response)
  }),

  // 登出
  http.post(`${baseUrl}/auth/logout`, async () => {
    await delay(300)

    const response: ApiResponse<null> = {
      code: 0,
      message: '登出成功',
      data: null,
    }

    return HttpResponse.json(response)
  }),

  // 获取用户信息
  http.get(`${baseUrl}/auth/userInfo`, async ({ request }) => {
    await delay(300)

    // 检查 Authorization header
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        { code: 401, message: '未授权', data: null },
        { status: 401 }
      )
    }

    const data: UserInfo = {
      id: 1,
      username: 'admin',
      nickname: '超级管理员',
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      email: 'admin@example.com',
      roles: ['admin'],
      permissions: ['*'],
    }

    const response: ApiResponse<UserInfo> = {
      code: 0,
      message: '获取成功',
      data,
    }

    return HttpResponse.json(response)
  }),

  // 刷新 Token
  http.post(`${baseUrl}/auth/refresh`, async () => {
    await delay(300)

    const data = {
      token: `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      refreshToken: `mock_refresh_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    }

    const response: ApiResponse<typeof data> = {
      code: 0,
      message: '刷新成功',
      data,
    }

    return HttpResponse.json(response)
  }),
]
