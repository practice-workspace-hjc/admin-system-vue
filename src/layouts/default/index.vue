<template>
  <div class="layout-default">
    <Sidebar class="layout-sidebar" />
    <div class="layout-main" :class="{ 'is-collapsed': sidebarCollapsed }">
      <Header class="layout-header" />
      <div class="layout-content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </div>
      <Footer class="layout-footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
import Footer from './Footer.vue'

const appStore = useAppStore()
const sidebarCollapsed = computed(() => appStore.sidebarCollapsed)
</script>

<style scoped lang="scss">
.layout-default {
  display: flex;
  height: 100vh;
  width: 100%;
}

.layout-sidebar {
  flex-shrink: 0;
}

.layout-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  margin-left: 0;
  transition: margin-left var(--transition-duration);
  overflow: hidden;
}

.layout-header {
  flex-shrink: 0;
}

.layout-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: var(--bg-color-page);
}

.layout-footer {
  flex-shrink: 0;
}

// 过渡动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
