import { request } from './index'
import type { Role, RoleForm, PageParams, PageResponse } from '@/types'

// 获取角色列表
export const getRoleList = (params: PageParams) => {
  return request.get<PageResponse<Role>>('/roles', { params })
}

// 获取所有角色（下拉选择用）
export const getAllRoles = () => {
  return request.get<Role[]>('/roles/all')
}

// 获取角色详情
export const getRoleDetail = (id: number) => {
  return request.get<Role>(`/roles/${id}`)
}

// 创建角色
export const createRole = (data: RoleForm) => {
  return request.post<Role>('/roles', data)
}

// 更新角色
export const updateRole = (id: number, data: RoleForm) => {
  return request.put<Role>(`/roles/${id}`, data)
}

// 删除角色
export const deleteRole = (id: number) => {
  return request.delete(`/roles/${id}`)
}
