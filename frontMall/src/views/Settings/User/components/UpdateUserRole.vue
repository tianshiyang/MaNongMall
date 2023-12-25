<template>
  <el-dialog
    v-model="visible"
    title="配置角色"
    @closed="handleClose"
    :validate-on-rule-change="false"
  >
    <el-form
      ref="UserRoleRef"
      :model="formData"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item
        label="角色名称"
        prop="role_list"
      >
        <RoleSelect v-model="formData.role_list" />
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
import { updateUserRoleListAPI, getUserDetailAPI } from "@/api/setting/index"
import { ElNotification } from "element-plus"
import RoleSelect from "@/views/Settings/components/RoleSelect.vue"

const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void
  (event: "updateSuccess"): void
}>()

const props = defineProps({
  modelValue: Boolean,
  user_id: [Number, String]
})

const visible = ref(true)

// 获取用户角色信息
const getUserRoleList = async () => {
  try {
    const data = await getUserDetailAPI({ user_id: props.user_id! })
    formData.role_list = data.role_list.map((item: any) => item.role_id)
  } catch (err: any) {
    ElNotification({
      title: "失败",
      message: err.error_message,
      type: "error"
    })
  }
}

// 表单实例
const UserRoleRef = ref()

// 表单数据源
const formData = reactive({
  role_list: []
})

// 表单校验
const rules = reactive({
  role_list: [{ required: true, message: "请选择角色", trigger: "change" }]
})

// 关闭
const handleClose = () => {
  emit("update:modelValue", false)
}

// 提交
const handleCommit = async () => {
  await UserRoleRef.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        const params = {
          user_id: props.user_id as number,
          role_list: JSON.stringify(formData.role_list)
        }
        await updateUserRoleListAPI(params)
        ElNotification({
          title: "成功",
          message: "修改员工角色成功",
          type: "success"
        })
        emit("updateSuccess")
        handleClose()
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
