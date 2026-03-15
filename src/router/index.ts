import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory("/practice-workspace-hjc/admin-system-vue"),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
