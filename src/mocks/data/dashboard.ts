import { faker } from '@faker-js/faker/locale/zh_CN'
import type { DashboardOverview, TrendItem, CategoryItem } from '@/types'

// 生成概览数据
export const generateOverview = (): DashboardOverview => {
  return {
    userCount: faker.number.int({ min: 1000, max: 9999 }),
    roleCount: faker.number.int({ min: 5, max: 20 }),
    visitCount: faker.number.int({ min: 10000, max: 99999 }),
    orderCount: faker.number.int({ min: 500, max: 5000 }),
  }
}

// 生成趋势数据
export const generateTrend = (): TrendItem[] => {
  const data: TrendItem[] = []
  const today = new Date()

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    data.push({
      date: date.toISOString().split('T')[0],
      value: faker.number.int({ min: 100, max: 1000 }),
    })
  }

  return data
}

// 生成分类数据
export const generateCategory = (): CategoryItem[] => {
  return [
    { name: '直接访问', value: faker.number.int({ min: 100, max: 500 }) },
    { name: '搜索引擎', value: faker.number.int({ min: 200, max: 600 }) },
    { name: '外部链接', value: faker.number.int({ min: 100, max: 400 }) },
    { name: '社交媒体', value: faker.number.int({ min: 50, max: 300 }) },
    { name: '邮件营销', value: faker.number.int({ min: 50, max: 200 }) },
  ]
}
