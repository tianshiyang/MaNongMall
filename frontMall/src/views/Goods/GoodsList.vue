<template>
  <el-form>
    <el-form-item label="商品名称">
      <GoodsSelect v-model="formData.goods_id" />
    </el-form-item>
    <el-form-item label="商品分类">
      <ClassificationSelectBySeller v-model="formData.classification_id" />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive } from "vue"
import GoodsSelect from "./components/GoodsSelect.vue"
import ClassificationSelectBySeller from "../Classification/components/ClassificationSelectBySeller.vue"

const formData = reactive({
  goods_id: "", // 商品ID
  classification_id: "", // 商品分类ID
})
</script>
