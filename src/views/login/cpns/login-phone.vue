<template>
  <el-form :rules="rules" label-width="80px" :model="account">
    <el-form-item label="手机号" prop="name" :model="account" ref="formRef">
      <el-input v-model="account.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="password">
      <div class="get-code">
        <el-input v-model="account.password"></el-input>
        <el-button type="primary">获取验证码</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const rules = {
  name: [
    {
      required: true,
      message: '无法进行手机登陆~',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{11}$/,
      message: '无法进行手机登陆',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '验证码是必传内容',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{4}$/,
      message: '验证码必须是4位',
      trigger: 'blur'
    }
  ]
}

const account = reactive({
  name: '',
  password: ''
})
</script>

<style scoped>
.el-item-button {
  text-align: center;
}
.get-code {
  display: flex;
}
</style>
