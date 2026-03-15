import { http, HttpResponse, delay } from 'msw'
import { mockUsers, generateUser } from '../data/users'
import type { ApiResponse, PageResponse, User, UserForm, PageParams } from '@/types'

const baseUrl = import.meta.env.VITE_API_BASE_URL

// 使用内存中的用户数据
let users = [...mockUsers]

export const userHandlers = [
  // 获取用户列表
  http.get(`${baseUrl}/users`, async ({ request }) => {
    await delay(500)

    const url = new URL(request.url)
    const params: PageParams = {
      page: parseInt(url.searchParams.get('page') || '1'),
      pageSize: parseInt(url.searchParams.get('pageSize') || '10'),
      keyword: url.searchParams.get('keyword') || '',
      status: url.searchParams.get('status') || '',
    }

    let filteredUsers = [...users]

    // 关键词搜索
    if (params.keyword) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.username.includes(params.keyword as string) ||
          user.nickname.includes(params.keyword as string) ||
          user.email.includes(params.keyword as string)
      )
    }

    // 状态过滤
    if (params.status !== '' && params.status !== undefined) {
      filteredUsers = filteredUsers.filter(
        (user) => user.status === parseInt(params.status as string)
      )
    }

    // 分页
    const start = (params.page! - 1) * params.pageSize!
    const end = start + params.pageSize!
    const paginatedUsers = filteredUsers.slice(start, end)

    const data: PageResponse<User> = {
      list: paginatedUsers,
      total: filteredUsers.length,
      page: params.page!,
      pageSize: params.pageSize!,
    }

    const response: ApiResponse<PageResponse<User>> = {
      code: 0,
      message: '获取成功',
      data,
    }

    return HttpResponse.json(response)
  }),

  // 获取用户详情
  http.get(`${baseUrl}/users/:id`, async ({ params }) => {
    await delay(300)

    const id = parseInt(params.id as string)
    const user = users.find((u) => u.id === id)

    if (!user) {
      return HttpResponse.json(
        { code: 404, message: '用户不存在', data: null },
        { status: 404 }
      )
    }

    const response: ApiResponse<User> = {
      code: 0,
      message: '获取成功',
      data: user,
    }

    return HttpResponse.json(response)
  }),

  // 创建用户
  http.post(`${baseUrl}/users`, async ({ request }) => {
    await delay(500)

    const body = (await request.json()) as UserForm
    const newUser = generateUser(users.length + 1)
    newUser.username = body.username
    newUser.nickname = body.nickname
    newUser.email = body.email
    newUser.phone = body.phone
    newUser.status = body.status
    newUser.roleId = body.roleId

    users.push(newUser)

    const response: ApiResponse<User> = {
      code: 0,
      message: '创建成功',
      data: newUser,
    }

    return HttpResponse.json(response)
  }),

  // 更新用户
  http.put(`${baseUrl}/users/:id`, async ({ params, request }) => {
    await delay(500)

    const id = parseInt(params.id as string)
    const body = (await request.json()) as UserForm
    const index = users.findIndex((u) => u.id === id)

    if (index === -1) {
      return HttpResponse.json(
        { code: 404, message: '用户不存在', data: null },
        { status: 404 }
      )
    }

    users[index] = {
      ...users[index],
      ...body,
      updateTime: new Date().toISOString(),
    }

    const response: ApiResponse<User> = {
      code: 0,
      message: '更新成功',
      data: users[index],
    }

    return HttpResponse.json(response)
  }),

  // 删除用户
  http.delete(`${baseUrl}/users/:id`, async ({ params }) => {
    await delay(500)

    const id = parseInt(params.id as string)
    const index = users.findIndex((u) => u.id === id)

    if (index === -1) {
      return HttpResponse.json(
        { code: 404, message: '用户不存在', data: null },
        { status: 404 }
      )
    }

    users.splice(index, 1)

    const response: ApiResponse<null> = {
      code: 0,
      message: '删除成功',
      data: null,
    }

    return HttpResponse.json(response)
  }),

  // 批量删除用户
  http.delete(`${baseUrl}/users`, async ({ request }) => {
    await delay(500)

    const body = (await request.json()) as { ids: number[] }
    users = users.filter((u) => !body.ids.includes(u.id))

    const response: ApiResponse<null> = {
      code: 0,
      message: '删除成功',
      data: null,
    }

    return HttpResponse.json(response)
  }),
]
