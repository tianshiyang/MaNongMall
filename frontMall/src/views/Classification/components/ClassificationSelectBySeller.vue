<template>
  <el-select
    v-model="formData.modelValue"
    filterable
    reserve-keyword
    clearable
    placeholder="请输入商品分类"
    :loading="formData.loading"
    @change="handleChange"
  >
    <el-option
      v-for="item in classificationList"
      :key="item.id"
      :label="item.classification_name"
      :value="item.id"
    />
  </el-select>
</template>

<script lang="ts" setup>
import { reactive, ref, defineEmits, watch } from "vue"
import { ElNotification } from "element-plus"
import { getCurrentSalesCanSelectClassificationAPI } from "@/api/goods"

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

const classificationList = ref<any[]>([])

// 请求获取可选择的商品分类
const getCurrentSalesCanSelectClassificationList = async () => {
  try {
    const result = await getCurrentSalesCanSelectClassificationAPI()
    classificationList.value = result
  } catch (err: any) {
    ElNotification({
      title: "失败",
      message: err.error_message,
      type: "error"
    })
  }
}

// 初始化
getCurrentSalesCanSelectClassificationList()

// 更新modelValue
const handleChange = (e: string | number) => {
  emit("update:modelValue", e)
}

watch(
  () => props.modelValue,
  () => {
    formData.modelValue = props.modelValue
  }
)
</script>
