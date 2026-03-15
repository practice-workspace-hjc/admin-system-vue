import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useDark, useToggle } from '@vueuse/core'

export const useAppStore = defineStore('app', () => {
  // 侧边栏折叠状态
  const sidebarCollapsed = ref(false)

  // 切换侧边栏
  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  // 暗黑模式
  const isDark = useDark()
  const toggleDark = useToggle(isDark)

  // 设备类型
  const device = computed(() => {
    const width = window.innerWidth
    if (width < 768) return 'mobile'
    if (width < 992) return 'tablet'
    return 'desktop'
  })

  const isMobile = computed(() => device.value === 'mobile')

  return {
    sidebarCollapsed,
    toggleSidebar,
    isDark,
    toggleDark,
    device,
    isMobile,
  }
})
