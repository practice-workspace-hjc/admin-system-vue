import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const base = import.meta.env.BASE_URL;

const router = createRouter({
  history: createWebHistory(base),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
