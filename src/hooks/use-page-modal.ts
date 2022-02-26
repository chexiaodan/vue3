import { ref } from 'vue'
import PageModal from '@/components/page-modal'

type callbackFn = (item?: any) => void

export function usePageModal(newCb?: callbackFn, editCb?: callbackFn) {
  const defaultInfo = ref({})
  const pegeModelRef = ref<InstanceType<typeof PageModal>>()
  const handleNewClick = () => {
    defaultInfo.value = {}
    if (pegeModelRef.value) {
      pegeModelRef.value.dialogVisible = true
    }
    newCb && newCb()
  }
  const handleEditBtnClick = (item: any) => {
    defaultInfo.value = { ...item }
    if (pegeModelRef.value) {
      pegeModelRef.value.dialogVisible = true
    }

    editCb && editCb(item)
  }
  return [pegeModelRef, defaultInfo, handleNewClick, handleEditBtnClick]
}
