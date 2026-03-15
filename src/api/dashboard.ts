import { request } from './index'
import type { DashboardOverview, TrendItem, CategoryItem } from '@/types'

// 获取概览数据
export const getOverview = () => {
  return request.get<DashboardOverview>('/dashboard/overview')
}

// 获取趋势数据
export const getTrend = () => {
  return request.get<TrendItem[]>('/dashboard/trend')
}

// 获取分类数据
export const getCategory = () => {
  return request.get<CategoryItem[]>('/dashboard/category')
}
