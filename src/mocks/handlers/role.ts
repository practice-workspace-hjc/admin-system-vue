import { http, HttpResponse, delay } from 'msw'
import { mockRoles, generateRoles } from '../data/roles'
import type { ApiResponse, PageResponse, Role, RoleForm, PageParams } from '@/types'

const baseUrl = import.meta.env.VITE_API_BASE_URL

// 使用内存中的角色数据
let roles = [...mockRoles, ...generateRoles(5)]

export const roleHandlers = [
  // 获取角色列表
  http.get(`${baseUrl}/roles`, async ({ request }) => {
    await delay(500)

    const url = new URL(request.url)
    const params: PageParams = {
      page: parseInt(url.searchParams.get('page') || '1'),
      pageSize: parseInt(url.searchParams.get('pageSize') || '10'),
      keyword: url.searchParams.get('keyword') || '',
      status: url.searchParams.get('status') || '',
    }

    let filteredRoles = [...roles]

    // 关键词搜索
    if (params.keyword) {
      filteredRoles = filteredRoles.filter(
        (role) =>
          role.name.includes(params.keyword as string) ||
          role.code.includes(params.keyword as string)
      )
    }

    // 状态过滤
    if (params.status !== '' && params.status !== undefined) {
      filteredRoles = filteredRoles.filter(
        (role) => role.status === parseInt(params.status as string)
      )
    }

    // 分页
    const start = (params.page! - 1) * params.pageSize!
    const end = start + params.pageSize!
    const paginatedRoles = filteredRoles.slice(start, end)

    const data: PageResponse<Role> = {
      list: paginatedRoles,
      total: filteredRoles.length,
      page: params.page!,
      pageSize: params.pageSize!,
    }

    const response: ApiResponse<PageResponse<Role>> = {
      code: 0,
      message: '获取成功',
      data,
    }

    return HttpResponse.json(response)
  }),

  // 获取所有角色
  http.get(`${baseUrl}/roles/all`, async () => {
    await delay(300)

    const response: ApiResponse<Role[]> = {
      code: 0,
      message: '获取成功',
      data: roles.filter((r) => r.status === 1),
    }

    return HttpResponse.json(response)
  }),

  // 获取角色详情
  http.get(`${baseUrl}/roles/:id`, async ({ params }) => {
    await delay(300)

    const id = parseInt(params.id as string)
    const role = roles.find((r) => r.id === id)

    if (!role) {
      return HttpResponse.json(
        { code: 404, message: '角色不存在', data: null },
        { status: 404 }
      )
    }

    const response: ApiResponse<Role> = {
      code: 0,
      message: '获取成功',
      data: role,
    }

    return HttpResponse.json(response)
  }),

  // 创建角色
  http.post(`${baseUrl}/roles`, async ({ request }) => {
    await delay(500)

    const body = (await request.json()) as RoleForm
    const newRole: Role = {
      id: roles.length + 1,
      name: body.name,
      code: body.code,
      description: body.description,
      status: body.status,
      permissions: body.permissions,
      createTime: new Date().toISOString(),
      updateTime: new Date().toISOString(),
    }

    roles.push(newRole)

    const response: ApiResponse<Role> = {
      code: 0,
      message: '创建成功',
      data: newRole,
    }

    return HttpResponse.json(response)
  }),

  // 更新角色
  http.put(`${baseUrl}/roles/:id`, async ({ params, request }) => {
    await delay(500)

    const id = parseInt(params.id as string)
    const body = (await request.json()) as RoleForm
    const index = roles.findIndex((r) => r.id === id)

    if (index === -1) {
      return HttpResponse.json(
        { code: 404, message: '角色不存在', data: null },
        { status: 404 }
      )
    }

    roles[index] = {
      ...roles[index],
      ...body,
      updateTime: new Date().toISOString(),
    }

    const response: ApiResponse<Role> = {
      code: 0,
      message: '更新成功',
      data: roles[index],
    }

    return HttpResponse.json(response)
  }),

  // 删除角色
  http.delete(`${baseUrl}/roles/:id`, async ({ params }) => {
    await delay(500)

    const id = parseInt(params.id as string)
    const index = roles.findIndex((r) => r.id === id)

    if (index === -1) {
      return HttpResponse.json(
        { code: 404, message: '角色不存在', data: null },
        { status: 404 }
      )
    }

    roles.splice(index, 1)

    const response: ApiResponse<null> = {
      code: 0,
      message: '删除成功',
      data: null,
    }

    return HttpResponse.json(response)
  }),
]
