<template>
  <el-dialog
    v-model="visible"
    title="更新密码"
    @closed="handleClose"
    :validate-on-rule-change="false"
  >
    <el-form
      :model="formData"
      label-width="120px"
      :rules="rules"
      ref="UpdateUserPasswordRef"
    >
      <el-form-item
        prop="password"
        label="密码"
      >
        <el-input
          v-model="formData.password"
          type="password"
          placeholder="请输入员工密码"
          clearable
        />
      </el-form-item>
      <el-form-item
        prop="re_password"
        label="再次输入"
      >
        <el-input
          v-model="formData.re_password"
          type="password"
          placeholder="请再次输入员工密码"
          clearable
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button
        type="primary"
        @click="handleCommit"
      >
        提交
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue"
import { updateUserPasswordAPI } from "@/api/setting/index"
import { ElNotification } from "element-plus"

const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void
  (event: "updateSuccess"): void
}>()

const props = defineProps({
  modelValue: Boolean,
  user_id: [Number, String]
})

const visible = ref(true)

// 表单实例
const UpdateUserPasswordRef = ref()

// 表单数据源
const formData = reactive({
  password: "", // 密码
  re_password: "" // 再次输入的密码
})

// 表单校验规则
const rules = {
  password: [{ required: true, message: "请输入密码", trigger: "change" }],
  re_password: [
    { required: true, message: "请再次输入密码", trigger: "change" }
  ]
}

// 关闭
const handleClose = () => {
  emit("update:modelValue", false)
}

// 提交
const handleCommit = async () => {
  await UpdateUserPasswordRef.value.validate((valid: boolean) => {
    if (valid) {
      if (formData.password !== formData.re_password) {
        ElNotification({
          title: "失败",
          message: "两次输入不一致",
          type: "error"
        })
        return
      }
      const params = {
        password: formData.password,
        user_id: props.user_id
      }
      updateUserPasswordAPI(params)
        .then(() => {
          ElNotification({
            title: "成功",
            message: "修改员工密码成功",
            type: "success"
          })
          emit("updateSuccess")
          handleClose()
        })
        .catch((err: any) => {
          ElNotification({
            title: "失败",
            message: err.error_message,
            type: "error"
          })
        })
    }
  })
}
</script>

<style lang="scss" scoped>
:deep(.el-input, .el-select) {
  width: 260px;
}
</style>
