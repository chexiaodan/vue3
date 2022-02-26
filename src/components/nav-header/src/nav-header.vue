<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick">
      <fold v-if="isCollapse" />
      <expand v-else />
    </el-icon>
    <div class="content">
      <div>
        <nav-breadcrumb :breadcrumb="breadcrumb"></nav-breadcrumb>
      </div>
      <div class="userInfo">
        <el-dropdown :hide-on-click="false">
          <span class="el-dropdown-link">
            {{ name }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="exitClick">退出登陆</el-dropdown-item>
              <el-dropdown-item divided>用户信息</el-dropdown-item>
              <el-dropdown-item divided>系统管理</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits, computed } from 'vue'
import { Fold, Expand, ArrowDown } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import navBreadcrumb from './nav-breadcrumb.vue'
import type { IBreadcrumb } from './types'
import { pathMapBreadcrumbs } from '@/utils/map-menu'
import { useRoute, useRouter } from 'vue-router'
import localCache from '@/utils/cache'

const isCollapse = ref(false)
const emit = defineEmits(['foldChange'])
const handleFoldClick = () => {
  isCollapse.value = !isCollapse.value
  emit('foldChange', isCollapse)
}

const store = useStore()
const name = computed(() => store.state.login.userInfo.name)
const breadcrumb = computed(() => {
  const userMenus = store.state.login.userMenus
  const route = useRoute()
  const currentPath = route.path
  return pathMapBreadcrumbs(userMenus, currentPath)
})
const router = useRouter()
const exitClick = () => {
  localCache.delectCache('token')
  router.push('/main')
}
</script>

<style scoped lang="less">
.nav-header {
  width: 100%;
  display: flex;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
    .userInfo {
      cursor: pointer;
    }
  }
}
</style>
