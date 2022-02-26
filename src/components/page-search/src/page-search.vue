<template>
  <div>
    <hm-form v-bind="formConfig" v-model="formData">
      <template #header>
        <h2 class="header">高级检索</h2>
      </template>
      <template #footer>
        <div class="btns">
          <el-button @click="restClick">重置</el-button>
          <el-button type="primary" @click="queryClick">搜索</el-button>
        </div>
      </template>
    </hm-form>
  </div>
</template>

<script lang="ts" setup>
import HmForm from '@/base-ui/form'
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  formConfig: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['resetBtnClick', 'queryBtnClick'])

const formItems = props.formConfig.formItems ?? []
const formOriginData: any = {}
for (const item of formItems) {
  formOriginData[item.field] = ''
}

const formData = ref(formOriginData)

const restClick = () => {
  for (const key in formOriginData) {
    formData.value[`${key}`] = formOriginData[key]
  }
  emit('resetBtnClick')
}

const queryClick = () => {
  emit('queryBtnClick', formData.value)
}
</script>

<style scoped lang="less">
.header {
  color: red;
}
.btns {
  padding: 30px;
}
</style>
