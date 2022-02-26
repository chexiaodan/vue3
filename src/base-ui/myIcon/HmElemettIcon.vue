<template>
  <el-icon :size="size" :color="color">
    <component :is="name"></component>
  </el-icon>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import * as Icons from '@element-plus/icons-vue'

export default defineComponent({
  components: Icons,
  name: 'ElIcons',
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    }
  }
})
</script>
