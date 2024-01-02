<template>
  <el-select
    v-model="formData.modelValue"
    filterable
    remote
    reserve-keyword
    clearable
    placeholder="请输入商品名称"
    :remote-method="getGoodsList"
    :loading="formData.loading"
    @change="handleChange"
  >
    <el-option
      v-for="item in goodsList"
      :key="item.id"
      :label="item.goods_name"
      :value="item.id"
    />
  </el-select>
</template>

<script lang="ts" setup>
import { reactive, ref, defineEmits, watch } from "vue"
import { ElNotification } from "element-plus"
import { getGoodsListAPI } from "@/api/goods"

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

const goodsList = ref<any[]>([])

// 请求获取商品列表
const getGoodsList = (goods_name: string, goods_id: string | number) => {
  const params = {
    goods_name,
    goods_id: !goods_name ? goods_id : "", // 兼容：如果有goods_name就用goods_name搜，如果没有，就用goods_id搜
    page_no: 1,
    page_size: 20
  }
  getGoodsListAPI(params)
    .then((res) => {
      goodsList.value = res.list
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
    getGoodsList("", props.modelValue as string | number)
  }
)
// 更新modelValue
const handleChange = (e: string | number) => {
  emit("update:modelValue", e)
}
</script>
