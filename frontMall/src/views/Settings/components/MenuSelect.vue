<template>
  <el-select
    v-model="formData.modelValue"
    filterable
    remote
    reserve-keyword
    clearable
    placeholder="请输入菜单名称"
    :remote-method="getMenuAllList"
    :loading="formData.loading"
    @change="handleChange"
  >
    <el-option
      v-for="item in menuList"
      :key="item.id"
      :label="item.menu_name"
      :value="item.id"
    />
  </el-select>
</template>

<script lang="ts" setup>
import { reactive, ref, defineEmits, watch } from "vue"
import { getMenuListAPI } from "@/api/setting"
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

const menuList = ref<any[]>([])

// 请求获取菜单列表
const getMenuAllList = (menu_name: string, menu_id: string | number) => {
  const params = {
    menu_name,
    menu_id: !menu_name ? menu_id : "", // 兼容：如果有menu_name就用menu_name搜，如果没有，就用menu_id搜
    page_no: 1,
    page_size: 10
  }
  getMenuListAPI(params)
    .then((res) => {
      menuList.value = res.list
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
    getMenuAllList("", props.modelValue as string | number)
  }
)
// 更新modelValue
const handleChange = (e: string | number) => {
  emit("update:modelValue", e)
}
</script>
