<template>
  <div class="sidebar" :class="{ 'is-collapsed': isCollapsed }">
    <div class="sidebar-logo">
      <img src="@/assets/logo.svg" alt="Logo" class="logo-img" />
      <span v-show="!isCollapsed" class="logo-text">{{ title }}</span>
    </div>
    <el-menu
      :default-active="activeMenu"
      :collapse="isCollapsed"
      :collapse-transition="false"
      :unique-opened="true"
      router
      class="sidebar-menu"
      background-color="var(--sidebar-bg-color)"
      text-color="var(--sidebar-text-color)"
      active-text-color="var(--sidebar-active-text-color)"
    >
      <template v-for="route in menuRoutes" :key="route.path">
        <!-- 有子菜单 -->
        <el-sub-menu
          v-if="route.children && route.children.length > 1"
          :index="route.path"
        >
          <template #title>
            <el-icon><component :is="route.meta?.icon" /></el-icon>
            <span>{{ route.meta?.title }}</span>
          </template>
          <el-menu-item
            v-for="child in route.children.filter((c: any) => !c.meta?.hidden)"
            :key="child.path"
            :index="`${route.path}/${child.path}`"
          >
            <el-icon><component :is="child.meta?.icon" /></el-icon>
            <span>{{ child.meta?.title }}</span>
          </el-menu-item>
        </el-sub-menu>
        <!-- 单个菜单项 -->
        <el-menu-item
          v-else-if="route.children?.length === 1"
          :index="`${route.path}/${route.children[0].path}`.replace('//', '/')"
        >
          <el-icon><component :is="route.children[0].meta?.icon" /></el-icon>
          <span>{{ route.children[0].meta?.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { asyncRoutes } from '@/router/routes'

const route = useRoute()
const appStore = useAppStore()

const title = import.meta.env.VITE_APP_TITLE
const isCollapsed = computed(() => appStore.sidebarCollapsed)

const activeMenu = computed(() => {
  return route.path
})

const menuRoutes = computed(() => {
  return asyncRoutes.filter((r) => !r.meta?.hidden)
})
</script>

<style scoped lang="scss">
.sidebar {
  width: var(--sidebar-width);
  height: 100%;
  background-color: var(--sidebar-bg-color);
  transition: width var(--transition-duration);
  overflow: hidden;

  &.is-collapsed {
    width: var(--sidebar-collapsed-width);
  }
}

.sidebar-logo {
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo-img {
  width: 32px;
  height: 32px;
}

.logo-text {
  margin-left: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
}

.sidebar-menu {
  border-right: none;
  height: calc(100% - var(--header-height));
  overflow-y: auto;

  &:not(.el-menu--collapse) {
    width: var(--sidebar-width);
  }
}
</style>
