<template>
  <el-transfer
    :disabled="props.disabled"
    v-model="selectedValue"
    :data="permissionList"
    @change="handleChange"
  />
</template>

<script lang="ts" setup>
import { getPermissionListAPI } from "@/api/setting"
import { defineProps, ref, watch } from "vue"
import { ElNotification } from "element-plus"

const props = defineProps({
  modelValue: Array,
  disabled: Boolean
})

const emit = defineEmits<{
  (event: "update:modelValue", value: number[]): void
}>()

// 已选择的
const selectedValue = ref(props.modelValue)

// 权限列表
const permissionList = ref([])

// 获取权限列表
const getPermissionList = async () => {
  const params = {
    page_no: 1,
    page_size: 1000
  }
  try {
    const data = await getPermissionListAPI(params)
    permissionList.value = data.list.map((res: any) => {
      return {
        key: res.id,
        label: res.permission_name
      }
    })
  } catch (err: any) {
    ElNotification({
      title: "失败",
      message: err.error_message,
      type: "error"
    })
  }
}

// 改变更新modelValue
const handleChange = () => {
  emit("update:modelValue", selectedValue.value as number[])
}

watch(
  () => props.modelValue,
  () => (selectedValue.value = props.modelValue)
)

// 初始化
getPermissionList()
</script>
