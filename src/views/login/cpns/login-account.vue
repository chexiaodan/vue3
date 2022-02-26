<template>
  <el-form :rules="rules" label-width="60px" :model="account" ref="formRef">
    <el-form-item label="账号" prop="name" :model="account" ref="formRef">
      <el-input v-model="account.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input show-password v-model="account.password"></el-input>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ElForm } from 'element-plus'
import { reactive, defineExpose, ref } from 'vue'
import localCache from '@/utils/cache'
import { useStore } from 'vuex'

const store = useStore()

const rules = {
  name: [
    {
      required: true,
      message: '用户名是必传内容~',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '用户名必须是5~10个字母或者数字~',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码是必传内容',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '密码必须是5-10位',
      trigger: 'blur'
    }
  ]
}

const account = reactive({
  name: localCache.getCache('name'),
  password: localCache.getCache('password')
})

const formRef = ref<InstanceType<typeof ElForm>>()

const loginAction = (keepPassword: boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      if (keepPassword) {
        // 本地缓存
        localCache.setCache('name', account.name)
        localCache.setCache('password', account.password)
      } else {
        localCache.delectCache('name')
        localCache.delectCache('password')
      }
      // 登陆验证
      store.dispatch('login/accountLoginAction', { ...account })
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style scoped>
.el-item-button {
  text-align: center;
}
</style>
