<template>
  <el-dialog
    v-model="visible"
    :title="props.permission_id ? '编辑权限' : '创建权限'"
    @closed="handleClose"
    :validate-on-rule-change="false"
  >
    <el-form
      :model="formData"
      label-width="120px"
      :rules="rules"
      ref="UpdatePermissionRef"
    >
      <el-form-item
        prop="permission_name"
        label="权限名称"
      >
        <el-input
          v-model="formData.permission_name"
          placeholder="请输入权限名称"
          clearable
        />
      </el-form-item>
      <el-form-item
        prop="permission_sign"
        label="权限标识"
      >
        <el-input
          v-model="formData.permission_sign"
          placeholder="请输入权限标识"
          :disabled="!!props.permission_id"
          clearable
        />
      </el-form-item>
      <el-form-item
        prop="permission_remark"
        label="权限描述"
      >
        <el-input
          v-model="formData.permission_remark"
          placeholder="请输入权限描述"
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
import { reactive, ref, watch } from "vue"
import { getPermissionDetailAPI, updatePermissionAPI } from "@/api/setting"
import { ElNotification } from "element-plus"

const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void
  (event: "updateSuccess"): void
}>()

const props = defineProps({
  modelValue: Boolean,
  permission_id: {
    // 当前权限的id, 如果有ID则为编辑，没有则为新增
    type: [Number, String],
    required: true
  }
})

const visible = ref(true)

// 表单实例
const UpdatePermissionRef = ref()

// 表单数据源
const formData = reactive({
  permission_id: "", // 权限id
  permission_name: "", // 菜单名称
  permission_sign: "", // 菜单路径
  permission_remark: "" // 权限描述
})

// 表单校验规则
const rules = {
  permission_name: [
    { required: true, message: "请输入权限名称", trigger: "change" }
  ],
  permission_sign: [
    { required: true, message: "请输入权限标识", trigger: "change" }
  ],
  permission_remark: [
    { required: true, message: "请输入权限描述", trigger: "change" }
  ]
}

// 获取权限详情
const getPermissionDetail = async () => {
  try {
    const data = await getPermissionDetailAPI({
      permission_id: props.permission_id
    })
    formData.permission_name = data.permission_name
    formData.permission_sign = data.permission_sign
    formData.permission_remark = data.permission_remark
  } catch (e: any) {
    ElNotification({
      title: "失败",
      message: e.error_message,
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
  await UpdatePermissionRef.value.validate((valid: boolean) => {
    if (valid) {
      const params = {
        permission_id: props.permission_id,
        permission_name: formData.permission_name,
        permission_sign: formData.permission_sign,
        permission_remark: formData.permission_remark
      }
      updatePermissionAPI(params)
        .then(() => {
          let message = ""
          if (props.permission_id) {
            message = "编辑成功"
          } else {
            message = "创建成功"
          }
          ElNotification({
            title: "成功",
            message,
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

// 初始化
const initData = () => {
  if (props.permission_id) {
    getPermissionDetail()
  }
}

watch(
  () => props.modelValue,
  () => (visible.value = props.modelValue)
)

initData()
</script>

<style lang="scss" scoped>
:deep(.el-input, .el-select) {
  width: 260px;
}
</style>
