<template>
  <el-dialog
    v-model="visible"
    title="编辑员工"
    @closed="handleClose"
    :validate-on-rule-change="false"
  >
    <el-form
      :model="formData"
      :rules="rules"
      ref="EditUserRef"
      label-width="120px"
    >
      <el-form-item
        label="员工姓名"
        prop="username"
      >
        <el-input
          v-model="formData.username"
          clearable
          placeholder="请输入员工姓名"
        />
      </el-form-item>
      <el-form-item
        label="员工手机号"
        prop="phone"
      >
        <el-input
          v-model="formData.phone"
          clearable
          placeholder="请输入员工手机号"
        />
      </el-form-item>
      <el-form-item
        label="员工身份证号"
        prop="id_number"
      >
        <el-input
          v-model="formData.id_number"
          clearable
          placeholder="请输入员工身份证号"
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
import { editUserInfoAPI, getUserDetailAPI } from "@/api/setting/index"
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

// 表单数据源
const formData = reactive({
  username: "", // 用户姓名
  phone: "", // 用户手机号
  id_number: "" // 用户身份证号
})

const rules = {
  username: [
    {
      required: true,
      message: "请输入员工姓名",
      trigger: "change"
    }
  ],
  phone: [
    {
      required: true,
      message: "请输入员工手机号",
      trigger: "change"
    }
  ],
  id_number: [
    {
      required: true,
      message: "请输入员工身份证号",
      trigger: "change"
    }
  ]
}

// form表单实例
const EditUserRef = ref()

// 获取用户角色信息
const getUserRoleList = async () => {
  try {
    const data = await getUserDetailAPI({ user_id: props.user_id! })
    formData.username = data.username
    formData.phone = data.phone
    formData.id_number = data.id_number
  } catch (err: any) {
    ElNotification({
      title: "失败",
      message: err.error_message,
      type: "error"
    })
  }
}

// 关闭
const handleClose = () => {
  emit("update:modelValue", false)
}

// 提交
const handleCommit = async () => {
  await EditUserRef.value.validate(async (valid: boolean) => {
    if (valid) {
      const params = {
        user_id: props.user_id as number,
        ...formData
      }
      try {
        await editUserInfoAPI(params)
        ElNotification({
          title: "成功",
          message: "修改员工密码成功",
          type: "success"
        })
        handleClose()
        emit("updateSuccess")
      } catch (err: any) {
        ElNotification({
          title: "失败",
          message: err.error_message,
          type: "error"
        })
      }
    }
  })
}

// 初始化
getUserRoleList()
</script>

<style lang="scss" scoped>
:deep(.el-input, .el-select) {
  width: 260px;
}
</style>
