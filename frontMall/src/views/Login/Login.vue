<template>
  <div class="container">
    <el-card shadow="hover" class="login-card" header="登录">
      <el-form :model="formData" ref="LoginRef" :rules="rules">
        <el-form-item label="账号" prop="account_number">
          <el-input v-model="formData.account_number" maxlength="48" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" type="password" show-password maxlength="16" />
        </el-form-item>
      </el-form>
      <section class="button-box">
        <el-button type="primary" @click="handleLogin">登录</el-button>
      </section>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { userLoginAPI } from "@/api/user"
import { ElNotification } from "element-plus"

// 表单实例
const LoginRef = ref()

// 表单数据源
const formData = reactive({
  account_number: "",
  password: "",
})

// 校验规则
const rules = {
  account_number: [{ required: true, message: '请输入账号' }],
  password: [{ required: true, message: "请输入密码" }]
}

// 登录
const handleLogin = async () => {
  await LoginRef.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        const data = await userLoginAPI(formData)
        localStorage.setItem('token', data.token)
        ElNotification({
          title: '成功',
          message: '登录成功',
          type: 'success',
        })
      } catch (err: any) {
        ElNotification({
          title: '失败',
          message: err.error_message,
          type: 'error',
        })
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  background: #181818;

  .login-card {
    height: 250px;
    width: 40%;
    position: absolute;
    top: 50%;
    left: 60%;
    transform: translate(-50%, -50%);

    .button-box {
      float: right;
    }
  }
}

.el-input {
  width: 260px;
}
</style>