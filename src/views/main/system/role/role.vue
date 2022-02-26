<template>
  <div class="role">
    <page-search :formConfig="formConfig"></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @editBtnClick="handleEditBtnClick"
      @newBtnClick="handleNewClick"
    ></page-content>
    <page-modal
      :modalConfig="modalConfig"
      pageName="role"
      ref="pegeModelRef"
      :otherInfo="otherInfo"
      :defaultInfo="defaultInfo"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        >
        </el-tree>
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from 'vuex'

import { ElTree } from 'element-plus'
import PageContent from '@/components/page-content/page-content.vue'
import { contentTableConfig } from './config/content.config'
import PageSearch from '@/components/page-search/index'
import { formConfig } from './config/search.config'
import PageModal from '@/components/page-modal/src/page-modal.vue'
import { modalConfig } from './config/modal.config'
import { usePageModal } from '@/hooks/use-page-modal'
import { menuMapLeafKeys } from '@/utils/map-menu'

export default defineComponent({
  name: 'role',
  components: {
    PageContent,
    PageSearch,
    PageModal
  },
  setup() {
    // 1.处理pageModal的hook
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      const leafKeys = menuMapLeafKeys(item.menuList)
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    // const [pegeModelRef, defaultInfo, handleNewClick, handleEditBtnClick] =
    //   usePageModal()
    const pageModalHook = usePageModal(undefined, editCallback)
    const pegeModelRef = pageModalHook[0]
    const defaultInfo = pageModalHook[1]
    const handleNewClick: any = pageModalHook[2]
    const handleEditBtnClick: any = pageModalHook[3]

    const store = useStore()
    const menus = computed(() => store.state.entireMenu)

    const otherInfo = ref({})
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }

    return {
      contentTableConfig,
      formConfig,
      modalConfig,
      pegeModelRef,
      defaultInfo,
      handleNewClick,
      handleEditBtnClick,
      menus,
      otherInfo,
      handleCheckChange,
      elTreeRef
    }
  }
})
</script>

<style scoped>
.menu-tree {
  margin-left: 25px;
}
</style>
