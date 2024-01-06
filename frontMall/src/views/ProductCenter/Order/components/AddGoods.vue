<template>
  <el-dialog
    v-model="visible"
    title="新增订单"
    @closed="handleClose"
    :validate-on-rule-change="false"
  >
    <el-form
      :model="formData"
      label-width="140px"
      :rules="rules"
      ref="AddGoodsRef"
    >
      <el-form-item
        prop="goods_id"
        label="商品名称"
      >
        <GoodsSelect
          v-model="formData.goods_id"
          disabled
        />
      </el-form-item>
      <el-form-item label="商品售价">
        <el-input
          v-model="formData.price"
          placeholder="请输入商品售价"
          clearable
          disabled
        />
      </el-form-item>
      <el-form-item label="商品折扣">
        <el-input
          v-model="formData.discount"
          placeholder="请输入商品折扣"
          clearable
          disabled
        />
      </el-form-item>
      <el-form-item label="商品现价">
        <el-input
          v-model="formData.current_price"
          placeholder="商品现价"
          clearable
          disabled
        />
      </el-form-item>
      <el-form-item
        prop="sales_num"
        label="销售数量"
      >
        <el-input
          v-model="formData.sales_num"
          placeholder="销售数量"
          clearable
          oninput="value=value.replace(/[^\d]/g,'')"
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
import { ElNotification } from "element-plus"
import { getGoodsDetailAPI } from "@/api/goods/index"
import { addGoodsAPI } from "@/api/order/index"
import GoodsSelect from "@/views/ProductCenter/Components/GoodsSelect.vue"

const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void
  (event: "updateSuccess"): void
}>()

const props = defineProps({
  modelValue: Boolean,
  goods_id: [Number, String] // 当前商品的ID
})

const visible = ref(true)

// 表单实例
const AddGoodsRef = ref()

// 表单数据源
const formData = reactive({
  goods_id: props.goods_id, // 商品名称
  price: "", // 商品售价
  discount: "", // 商品折扣
  current_price: "", // 商品现价
  sales_num: "" // 售卖数量
})

// 表单校验规则
const rules = {
  goods_id: [{ required: true, message: "请选择商品名称", trigger: "change" }],
  sales_num: [{ required: true, message: "请输入售卖数量", trigger: "change" }]
}

// 获取商品详情
const getGoodsDetail = async () => {
  try {
    const data = await getGoodsDetailAPI({
      goods_id: props.goods_id!
    })
    formData.current_price = data.current_price
    formData.price = data.price
    formData.discount = data.discount
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
  await AddGoodsRef.value.validate(async (valid: boolean) => {
    if (valid) {
      const data = {
        sales_num: formData.sales_num,
        goods_id: formData.goods_id!
      }
      try {
        await addGoodsAPI(data)
        ElNotification({
          title: "成功",
          message: "新增成功",
          type: "success"
        })
        emit("update:modelValue", false)
        emit("updateSuccess")
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

getGoodsDetail()
</script>

<style lang="scss" scoped>
:deep(.el-input, .el-select) {
  width: 260px;
}
</style>
