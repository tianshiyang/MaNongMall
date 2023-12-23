<template>
  <el-select
    v-model="formData.modelValue"
    filterable
    remote
    reserve-keyword
    clearable
    placeholder="请输入员工姓名"
    :remote-method="getUserList"
    :loading="formData.loading"
    @change="handleChange"
  >
    <el-option
      v-for="item in userList"
      :key="item.id"
      :label="item.username"
      :value="item.id"
    />
  </el-select>
</template>

<script lang="ts" setup>
import { reactive, ref, defineEmits, watch } from "vue"
import { getUserListAPI } from "@/api/setting"
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

const userList = ref<any[]>([])

// 请求获取员工列表
const getUserList = async (username: string, user_id: string | number) => {
  const params = {
    username,
    user_id: !username ? user_id : "", // 兼容：如果有username就用username搜，如果没有，就用menu_id搜
    page_no: 1,
    page_size: 10
  }
  try {
    const data = await getUserListAPI(params)
    userList.value = data.list
  } catch (err: any) {
    ElNotification({
      title: "失败",
      message: err.error_message,
      type: "error"
    })
  }
}

watch(
  () => props.modelValue,
  () => {
    formData.modelValue = props.modelValue
    getUserList("", props.modelValue as string | number)
  }
)
// 更新modelValue
const handleChange = (e: string | number) => {
  emit("update:modelValue", e)
}
</script>
