<template>
  <el-dialog
    v-model="visible"
    title="更新库存"
    @closed="handleClose"
    :validate-on-rule-change="false"
  >
    <el-form
      :model="formData"
      label-width="140px"
      :rules="rules"
      ref="UpdateGoodsInventoryRef"
    >
      <el-form-item
        prop="inventory"
        label="商品库存"
      >
        <el-input
          v-model="formData.inventory"
          placeholder="请输入商品库存"
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
import { reactive, ref } from "vue"
import { ElNotification } from "element-plus"
import { getGoodsDetailAPI, updateInventoryAPI } from "@/api/goods/index"

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
const UpdateGoodsInventoryRef = ref()

// 表单数据源
const formData = reactive({
  inventory: "" // 商品名称
})

// 表单校验规则
const rules = {
  inventory: [{ required: true, message: "请输入商品库存", trigger: "change" }]
}

// 获取商品详情
const getGoodsDetail = async () => {
  try {
    const data = await getGoodsDetailAPI({
      goods_id: props.goods_id
    })
    formData.inventory = data.inventory
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
  await UpdateGoodsInventoryRef.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        const data = {
          goods_id: props.goods_id,
          inventory: formData.inventory
        }
        await updateInventoryAPI(data)
        ElNotification({
          title: "成功",
          message: "更新库存成功",
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

// 初始化
const initData = () => {
  getGoodsDetail()
}

initData()
</script>

<style lang="scss" scoped>
:deep(.el-input, .el-select) {
  width: 260px;
}
</style>
