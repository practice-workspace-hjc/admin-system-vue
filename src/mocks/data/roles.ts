import { faker } from '@faker-js/faker/locale/zh_CN'
import type { Role } from '@/types/role'

// 角色权限
const rolePermissions: Record<string, string[]> = {
  admin: ['*'],
  editor: ['user:read', 'user:write', 'content:read', 'content:write'],
  user: ['content:read'],
}

// 预定义角色
export const mockRoles: Role[] = [
  {
    id: 1,
    name: '超级管理员',
    code: 'admin',
    description: '拥有系统所有权限',
    status: 1,
    permissions: rolePermissions.admin,
    createTime: '2024-01-01T00:00:00.000Z',
    updateTime: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 2,
    name: '编辑',
    code: 'editor',
    description: '内容编辑权限',
    status: 1,
    permissions: rolePermissions.editor,
    createTime: '2024-01-01T00:00:00.000Z',
    updateTime: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 3,
    name: '普通用户',
    code: 'user',
    description: '基础访问权限',
    status: 1,
    permissions: rolePermissions.user,
    createTime: '2024-01-01T00:00:00.000Z',
    updateTime: '2024-01-01T00:00:00.000Z',
  },
]

// 生成角色数据
export const generateRole = (id: number): Role => {
  const code = faker.word.noun()
  return {
    id,
    name: faker.person.jobTitle(),
    code,
    description: faker.lorem.sentence(),
    status: faker.helpers.arrayElement([0, 1]) as 0 | 1,
    permissions: faker.helpers.arrayElements(['user:read', 'user:write', 'content:read', 'content:write'], { min: 1, max: 3 }),
    createTime: faker.date.past({ years: 1 }).toISOString(),
    updateTime: faker.date.recent({ days: 30 }).toISOString(),
  }
}

// 生成角色列表
export const generateRoles = (count: number): Role[] => {
  return Array.from({ length: count }, (_, i) => generateRole(i + mockRoles.length + 1))
}
