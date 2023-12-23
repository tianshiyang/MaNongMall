<template>
  <el-dialog
    v-model="visible"
    title="新增人员"
    @closed="handleClose"
    :validate-on-rule-change="false"
  >
    <el-form
      :model="formData"
      label-width="120px"
      :rules="rules"
      ref="CreateUserRef"
    >
      <el-form-item
        prop="username"
        label="员工姓名"
      >
        <el-input
          v-model="formData.username"
          placeholder="请输入员工姓名"
          clearable
        />
      </el-form-item>
      <el-form-item
        prop="phone"
        label="手机号"
      >
        <el-input
          v-model="formData.phone"
          placeholder="请输入手机号"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="身份证号"
        prop="id_number"
      >
        <el-input
          v-model="formData.id_number"
          placeholder="请输入身份证号"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          v-model="formData.password"
          type="password"
          placeholder="请输入密码"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="员工账号"
        prop="account_number"
      >
        <el-input
          v-model="formData.account_number"
          placeholder="请输入员工账号"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="员工角色"
        prop="role_list"
      >
        <RoleSelect
          v-model="formData.role_list"
          multiple
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
import { createUserAPI } from "@/api/setting/index"
import { ElNotification } from "element-plus"
import RoleSelect from "../../components/RoleSelect.vue"

const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void
  (event: "updateSuccess"): void
}>()

defineProps({
  modelValue: Boolean
})

const visible = ref(true)

// 表单实例
const CreateUserRef = ref()

// 表单数据源
const formData = reactive({
  username: "", // 员工姓名
  phone: "", // 员工手机号
  id_number: "", // 身份证号
  password: "", // 密码
  account_number: "", // 账号
  role_list: [] // 角色
})

// 表单校验规则
const rules = {
  username: [{ required: true, message: "请输入员工姓名", trigger: "change" }],
  phone: [{ required: true, message: "请输入手机号", trigger: "change" }],
  id_number: [
    { required: true, message: "请输入员工身份证号", trigger: "change" }
  ],
  password: [{ required: true, message: "请输入密码", trigger: "change" }],
  account_number: [
    { required: true, message: "请输入员工账号", trigger: "change" }
  ],
  role_list: [{ required: true, message: "请选择员工角色", trigger: "change" }]
}

// 关闭
const handleClose = () => {
  emit("update:modelValue", false)
}

// 提交
const handleCommit = async () => {
  await CreateUserRef.value.validate((valid: boolean) => {
    if (valid) {
      const params = {
        ...formData,
        role_list: JSON.stringify(formData.role_list)
      }
      createUserAPI(params)
        .then(() => {
          ElNotification({
            title: "成功",
            message: "创建成功",
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
