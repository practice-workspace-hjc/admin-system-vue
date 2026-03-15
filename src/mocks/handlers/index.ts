import { authHandlers } from './auth'
import { userHandlers } from './user'
import { roleHandlers } from './role'
import { dashboardHandlers } from './dashboard'

export const handlers = [
  ...authHandlers,
  ...userHandlers,
  ...roleHandlers,
  ...dashboardHandlers,
]
