import { http, HttpResponse, delay } from 'msw'
import { generateOverview, generateTrend, generateCategory } from '../data/dashboard'
import type { ApiResponse } from '@/types'

const baseUrl = import.meta.env.VITE_API_BASE_URL

export const dashboardHandlers = [
  // 获取概览数据
  http.get(`${baseUrl}/dashboard/overview`, async () => {
    await delay(300)

    const data = generateOverview()

    const response: ApiResponse<typeof data> = {
      code: 0,
      message: '获取成功',
      data,
    }

    return HttpResponse.json(response)
  }),

  // 获取趋势数据
  http.get(`${baseUrl}/dashboard/trend`, async () => {
    await delay(300)

    const data = generateTrend()

    const response: ApiResponse<typeof data> = {
      code: 0,
      message: '获取成功',
      data,
    }

    return HttpResponse.json(response)
  }),

  // 获取分类数据
  http.get(`${baseUrl}/dashboard/category`, async () => {
    await delay(300)

    const data = generateCategory()

    const response: ApiResponse<typeof data> = {
      code: 0,
      message: '获取成功',
      data,
    }

    return HttpResponse.json(response)
  }),
]
