import { request } from './index'
import type { User, UserForm, PageParams, PageResponse } from '@/types'

// 获取用户列表
export const getUserList = (params: PageParams) => {
  return request.get<PageResponse<User>>('/users', { params })
}

// 获取用户详情
export const getUserDetail = (id: number) => {
  return request.get<User>(`/users/${id}`)
}

// 创建用户
export const createUser = (data: UserForm) => {
  return request.post<User>('/users', data)
}

// 更新用户
export const updateUser = (id: number, data: UserForm) => {
  return request.put<User>(`/users/${id}`, data)
}

// 删除用户
export const deleteUser = (id: number) => {
  return request.delete(`/users/${id}`)
}

// 批量删除用户
export const batchDeleteUsers = (ids: number[]) => {
  return request.delete('/users', { data: { ids } })
}
