import { useUserStore } from '@/stores/user'

// 检查是否有权限
export const hasPermission = (permission: string | string[]): boolean => {
  const userStore = useUserStore()
  const permissions = userStore.permissions

  if (permissions.includes('*')) {
    return true
  }

  if (Array.isArray(permission)) {
    return permission.some(p => permissions.includes(p))
  }

  return permissions.includes(permission)
}

// 检查是否有角色
export const hasRole = (role: string | string[]): boolean => {
  const userStore = useUserStore()
  const roles = userStore.roles

  if (roles.includes('admin')) {
    return true
  }

  if (Array.isArray(role)) {
    return role.some(r => roles.includes(r))
  }

  return roles.includes(role)
}
