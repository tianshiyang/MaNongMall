<template>
  <el-select
    v-model="formData.modelValue"
    collapse-tags
    collapse-tags-tooltip
    filterable
    remote
    reserve-keyword
    clearable
    multiple
    placeholder="请输入角色名称"
    :remote-method="getRoleList"
    :loading="formData.loading"
    @change="handleChange"
  >
    <el-option
      v-for="item in roleList"
      :key="item.id"
      :label="item.role_name"
      :value="item.id"
    />
  </el-select>
</template>

<script lang="ts" setup>
import { reactive, ref, defineEmits, watch } from "vue"
import { getRoleListAPI } from "@/api/setting"
import { ElNotification } from "element-plus"

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void
}>()

const props = defineProps({
  modelValue: [Number, String, Array],
  multiple: {
    type: Boolean,
    default: false
  }
})

// 定义数据源
const formData = reactive({
  modelValue: props.modelValue,
  loading: false
})

const roleList = ref<any[]>([])

// 请求获取角色列表
const getRoleList = (role_name: string, role_id: string | number) => {
  const params = {
    role_name,
    role_id: !role_name ? role_id : "", // 兼容：如果有role_name就用role_name搜，如果没有，就用role_id搜
    page_no: 1,
    page_size: 10
  }
  getRoleListAPI(params)
    .then((res: any) => {
      roleList.value = res.list
    })
    .catch((err: any) => {
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
    getRoleList("", props.modelValue as string | number)
  },
  {
    immediate: true
  }
)
// 更新modelValue
const handleChange = (e: string | number) => {
  emit("update:modelValue", e)
}
</script>
