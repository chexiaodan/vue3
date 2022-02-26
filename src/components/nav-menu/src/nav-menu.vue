<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!props.isFold" class="title">Vue3+TS</span>
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      :default-active="defaultActive + ''"
      :collapse="props.isFold"
    >
      <template v-for="item in userMenus" :key="item.id">
        <el-sub-menu :index="item.id + ''" class="el-sub-menu">
          <template #title>
            <el-icon class="icon"><setting /></el-icon>
            <span>{{ item.name }}</span>
          </template>
          <template v-for="child in item.children" :key="child.id">
            <el-menu-item
              @click="menuClick(child)"
              class="el-menu-item-group"
              :index="child.id + ''"
              >{{ child.name }}</el-menu-item
            >
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, ref } from 'vue'
import { Setting } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { pathMapToMenu } from '@/utils/map-menu'

const props = defineProps({
  isFold: Boolean
})

const store = useStore()
const userMenus = computed(() => store.state.login.userMenus)
const router = useRouter()
const route = useRoute()
const currentPath = route.path

const menu = pathMapToMenu(userMenus.value, currentPath)

const defaultActive = menu.id

const menuClick = (item: any) => {
  router.push({
    path: item.url ?? '/not-found'
  })
}
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
}
.el-menu {
  border-right: none;
}

.el-menu-vertical-demo {
  background-color: #001529 !important;
  color: white !important;
  --el-menu-hover-bg-color: #001529 !important;
  span {
    color: rgb(183, 189, 195);
  }
  .icon {
    color: rgb(183, 189, 195);
  }
  .el-menu-item:hover {
    background-color: #001529 !important;
  }
  .el-menu-item-group {
    background-color: #0c2135 !important;
    color: rgb(183, 189, 195) !important;
    padding-left: 50px !important;
  }
  .el-menu-item-group:hover {
    background-color: #0c2135 !important;
    color: #fff !important;
  }
  .el-menu-item-group.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}
.title-one {
  color: white;
}
</style>
