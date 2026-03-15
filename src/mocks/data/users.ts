import { faker } from '@faker-js/faker/locale/zh_CN'
import type { User } from '@/types/user'

// 生成用户数据
export const generateUser = (id: number): User => {
  return {
    id,
    username: faker.internet.username().toLowerCase(),
    nickname: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number({ style: 'national' }),
    avatar: faker.image.avatar(),
    status: faker.helpers.arrayElement([0, 1]) as 0 | 1,
    roleId: faker.number.int({ min: 1, max: 3 }),
    roleName: faker.helpers.arrayElement(['管理员', '编辑', '用户']),
    createTime: faker.date.past({ years: 2 }).toISOString(),
    updateTime: faker.date.recent({ days: 30 }).toISOString(),
  }
}

// 生成用户列表
export const generateUsers = (count: number): User[] => {
  return Array.from({ length: count }, (_, i) => generateUser(i + 1))
}

// 预生成的用户数据
export const mockUsers = generateUsers(50)
