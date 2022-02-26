<template>
  <div class="user">
    <div class="search">
      <page-search
        :formConfig="formConfig"
        @resetBtnClick="handleResetClick"
        @queryBtnClick="handleQueryClick"
      ></page-search>
    </div>
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @editBtnClick="handleEditBtnClick"
      @newBtnClick="handleNewClick"
    ></page-content>
    <!-- <page-modal :modalConfig="modalConfigRef"></page-modal> -->
    <page-modal
      :modalConfig="modalConfigRef"
      ref="pegeModelRef"
      :defaultInfo="defaultInfo"
      pageName="users"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { formConfig } from './config/search.config'
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import PageSearch from '@/components/page-search'
import { contentTableConfig } from './config/content.config'
import PageContent from '@/components/page-content/page-content.vue'
import { usePageModal } from '@/hooks/use-page-modal'
import { modalConfig } from './config/modal.config'
import { usePageSearch } from '@/hooks/usePageSearch'
import PageModal from '@/components/page-modal'

export default defineComponent({
  name: 'user',
  components: { PageSearch, PageContent, PageModal },
  setup() {
    // const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const pageSearchHook = usePageSearch()
    const pageContentRef = pageSearchHook[0]
    const handleResetClick: any = pageSearchHook[1]
    const handleQueryClick: any = pageSearchHook[2]

    const newCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = false
    }
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
    }

    const store = useStore()
    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem!.options = store.state.entireDepartment.map(
        (item: any) => {
          return { title: item.name, value: item.id }
        }
      )
      const roleItem = modalConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id }
      })
      return modalConfig
    })

    const pageModalHook = usePageModal(newCallback, editCallback)
    const pegeModelRef = pageModalHook[0]
    const defaultInfo = pageModalHook[1]
    const handleNewClick: any = pageModalHook[2]
    const handleEditBtnClick: any = pageModalHook[3]

    return {
      formConfig,
      contentTableConfig,
      handleResetClick,
      handleQueryClick,
      pageContentRef,
      modalConfigRef,
      handleNewClick,
      handleEditBtnClick,
      pegeModelRef,
      defaultInfo
    }
  }
})
</script>

<style scoped></style>
