<template>
  <el-dialog
    v-model="visible"
    :title="props.goods_id ? '编辑商品' : '新增商品'"
    @closed="handleClose"
    :validate-on-rule-change="false"
  >
    <el-form
      :model="formData"
      label-width="140px"
      :rules="rules"
      ref="UpdateGoodsRef"
    >
      <el-form-item
        prop="goods_name"
        label="商品名称"
      >
        <el-input
          v-model="formData.goods_name"
          placeholder="请输入商品名称"
          clearable
        />
      </el-form-item>
      <el-form-item
        prop="goods_classification"
        label="商品分类"
      >
        <ClassificationSelectBySeller v-model="formData.goods_classification" />
      </el-form-item>
      <el-form-item
        prop="inventory"
        label="商品库存"
      >
        <el-input
          v-model="formData.inventory"
          placeholder="请输入商品库存"
          clearable
          oninput="value=value.replace(/[^\d]/g,'')"
        />
      </el-form-item>
      <el-form-item
        prop="purchase_price"
        label="商品进价"
      >
        <el-input
          v-model="formData.purchase_price"
          placeholder="请输入商品进价"
          clearable
          oninput="value=value.replace(/[^\d]/g,'')"
        />
      </el-form-item>
      <el-form-item
        prop="price"
        label="商品售价"
      >
        <el-input
          v-model="formData.price"
          placeholder="请输入商品售价"
          clearable
          oninput="value=value.replace(/[^\d]/g,'')"
        />
      </el-form-item>
      <el-form-item
        prop="discount"
        label="商品折扣"
      >
        <el-input
          v-model="formData.discount"
          placeholder="请输入商品折扣"
          clearable
          oninput="value=value.replace(/^0[0-9]|^[2-9]|^1[0-9]|^1\.|[^\d.]/g,'')"
        />
      </el-form-item>
      <el-form-item
        prop="discount_time"
        label="折扣时间"
      >
        <el-date-picker
          v-model="formData.discount_time"
          @change="handleDiscountTimeChange"
          type="datetimerange"
          range-separator="到"
          value-format="YYYY-MM-DD HH:mm:ss"
          format="YYYY-MM-DD HH:mm:ss"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          :default-time="defaultTime"
        />
      </el-form-item>
      <el-form-item
        prop="listing_status"
        label="上架状态"
      >
        <el-switch v-model="formData.listing_status" />
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
import { ElNotification } from "element-plus"
import { getGoodsDetailAPI, updateGoodsAPI } from "@/api/goods/index"
import ClassificationSelectBySeller from "../../Classification/components/ClassificationSelectBySeller.vue"
import { defaultTime } from "@/utils/DataFormat"

const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void
  (event: "updateSuccess"): void
}>()

const props = defineProps({
  modelValue: Boolean,
  goods_id: {
    // 当前商品的id, 如果有ID则为编辑，没有则为新增
    type: [Number, String],
    required: true
  }
})

const visible = ref(true)

// 表单实例
const UpdateGoodsRef = ref()

// 表单数据源
const discount_time = ref<any[]>()
const formData = reactive({
  goods_name: "", // 商品名称
  goods_classification: "", // 商品分类
  inventory: "", // 商品库存
  purchase_price: "", // 商品进价
  price: "", // 商品售价
  discount: "", // 商品折扣
  discount_time, // 折扣时间
  discount_time_start: "", // 折扣开始时间
  discount_time_end: "", // 折扣结束时间
  listing_status: true
})

// 表单校验规则
const rules = {
  goods_name: [
    { required: true, message: "请输入商品名称", trigger: "change" }
  ],
  goods_classification: [
    { required: true, message: "请输入商品分类", trigger: "change" }
  ],
  inventory: [{ required: true, message: "请输入商品库存", trigger: "change" }],
  purchase_price: [
    { required: true, message: "请输入商品进价", trigger: "change" }
  ],
  price: [{ required: true, message: "请输入商品售价", trigger: "change" }],
  listing_status: [
    { required: true, message: "请选择上架状态", trigger: "change" }
  ]
}

// 获取商品详情
const getGoodsDetail = async () => {
  try {
    const data = await getGoodsDetailAPI({
      goods_id: props.goods_id
    })
    formData.goods_name = data.goods_name
    formData.goods_classification = data.goods_classification
    formData.inventory = data.inventory
    formData.purchase_price = data.purchase_price
    formData.price = data.price
    formData.discount = data.discount
    if (data.discount_time_start) {
      formData.discount_time = [
        data.discount_time_start,
        data.discount_time_end
      ]
    }
    formData.discount_time_start = data.discount_time_start
    formData.discount_time_end = data.discount_time_end
    formData.listing_status = data.listing_status
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
  await UpdateGoodsRef.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        const data = {
          goods_id: props.goods_id,
          ...formData,
          discount_time_start: formData.discount_time_start || null,
          discount_time_end: formData.discount_time_end || null,
          discount: formData.discount || null
        }
        await updateGoodsAPI(data)
        ElNotification({
          title: "成功",
          message: props.goods_id ? "编辑成功" : "新增成功",
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

// 时间改变
const handleDiscountTimeChange = (val: any) => {
  if (val) {
    formData.discount_time_start = val[0]
    formData.discount_time_end = val[1]
  } else {
    formData.discount_time_start = ""
    formData.discount_time_end = ""
  }
}

// 初始化
const initData = () => {
  if (props.goods_id) {
    getGoodsDetail()
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
