<template>
  <el-select
    v-model="formData.modelValue"
    filterable
    remote
    reserve-keyword
    clearable
    placeholder="请输入权限名称"
    :remote-method="getPermissionList"
    :loading="formData.loading"
    @change="handleChange"
  >
    <el-option
      v-for="item in permissionList"
      :key="item.id"
      :label="item.permission_name"
      :value="item.id"
    />
  </el-select>
</template>

<script lang="ts" setup>
import { reactive, ref, defineEmits, watch } from "vue"
import { getPermissionListAPI } from "@/api/setting/index"
import { ElNotification } from "element-plus"

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void
}>()

const props = defineProps({
  modelValue: [Number, String]
})

// 定义数据源
const formData = reactive({
  modelValue: props.modelValue,
  loading: false
})

const permissionList = ref<any[]>([])

// 请求获取菜单列表
const getPermissionList = (
  permission_name: string,
  permission_id: string | number
) => {
  const params = {
    permission_name,
    permission_id: !permission_name ? permission_id : "", // 兼容：如果有permission_name就用permission_name搜，如果没有，就用permission_id搜
    page_no: 1,
    page_size: 10
  }
  getPermissionListAPI(params)
    .then((res) => {
      permissionList.value = res.list
    })
    .catch((err) => {
      ElNotification({
        title: "失败",
        message: err.error_message,
        type: "error"
      })
    })
}

watch(
  () => props.modelValue,
  () => {
    formData.modelValue = props.modelValue
    getPermissionList("", props.modelValue as string | number)
  }
)
// 更新modelValue
const handleChange = (e: string | number) => {
  emit("update:modelValue", e)
}
</script>
