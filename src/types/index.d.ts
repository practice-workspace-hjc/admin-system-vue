// API 响应类型
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

// 分页响应
export interface PageResponse<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

// 分页请求参数
export interface PageParams {
  page?: number
  pageSize?: number
  [key: string]: any
}

// 用户类型
export interface User {
  id: number
  username: string
  nickname: string
  email: string
  phone: string
  avatar: string
  status: 0 | 1
  roleId: number
  roleName: string
  createTime: string
  updateTime: string
}

// 用户表单
export interface UserForm {
  id?: number
  username: string
  nickname: string
  email: string
  phone: string
  password?: string
  status: 0 | 1
  roleId: number
}

// 登录参数
export interface LoginParams {
  username: string
  password: string
}

// 登录响应
export interface LoginResult {
  token: string
  refreshToken: string
}

// 用户信息
export interface UserInfo {
  id: number
  username: string
  nickname: string
  avatar: string
  email: string
  roles: string[]
  permissions: string[]
}

// 角色类型
export interface Role {
  id: number
  name: string
  code: string
  description: string
  status: 0 | 1
  permissions: string[]
  createTime: string
  updateTime: string
}

// 角色表单
export interface RoleForm {
  id?: number
  name: string
  code: string
  description: string
  status: 0 | 1
  permissions: string[]
}

// 仪表盘概览
export interface DashboardOverview {
  userCount: number
  roleCount: number
  visitCount: number
  orderCount: number
}

// 趋势数据
export interface TrendItem {
  date: string
  value: number
}

// 分类数据
export interface CategoryItem {
  name: string
  value: number
}
