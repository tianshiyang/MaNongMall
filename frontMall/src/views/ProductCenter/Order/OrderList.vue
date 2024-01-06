<template>
  <el-form
    inline
    label-width="100px"
  >
    <el-form-item label="商品名称">
      <GoodsSelect v-model="formData.goods_id" />
    </el-form-item>
    <el-form-item label="商品分类">
      <ClassificationSelectBySeller v-model="formData.classification_id" />
    </el-form-item>
    <el-form-item label="销售人">
      <UserSelect v-model="formData.seller_id" />
    </el-form-item>
    <el-form-item label="订单时间">
      <el-date-picker
        v-model="formData.create_time"
        type="datetimerange"
        range-separator="到"
        value-format="YYYY-MM-DD HH:mm:ss"
        format="YYYY-MM-DD HH:mm:ss"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        :default-time="defaultTime"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="handleSearch"
      >
        查询
      </el-button>
      <el-button @click="handleReset">重置</el-button>
    </el-form-item>
  </el-form>
  <el-table
    :data="tableData.list"
    border
  >
    <el-table-column
      prop="goods_name"
      label="商品名称"
    />
    <el-table-column
      prop="classification_name"
      label="商品分类"
    />
    <el-table-column
      prop="seller_name"
      label="商品销售人"
    />
    <el-table-column
      prop="sales_num"
      label="售卖数量"
    />
    <el-table-column
      prop="transaction_volume"
      label="成交额"
    />
    <el-table-column
      prop="profit"
      label="获利"
    />
    <el-table-column
      prop="create_time"
      label="订单时间"
    />
  </el-table>

  <el-pagination
    class="el-pagination-class"
    v-model:current-page="formData.page_no"
    v-model:page-size="formData.page_size"
    :page-sizes="[2, 5, 10, 20]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="tableData.total"
    @size-change="getOrderList"
    @current-change="getOrderList"
  />
</template>

<script lang="ts" setup>
import { reactive } from "vue"
import { getOrderListAPI } from "@/api/order"
import { ElNotification } from "element-plus"
import GoodsSelect from "../Components/GoodsSelect.vue"
import ClassificationSelectBySeller from "../Components/ClassificationSelectBySeller.vue"
import { defaultTime } from "@/utils/DataFormat"
import UserSelect from "@/views/Settings/components/UserSelect.vue"

const formData = reactive({
  goods_id: "", // 商品名称
  classification_id: "", // 商品分类
  create_time: "", // 订单时间
  seller_id: "", // 销售人
  page_no: 1,
  page_size: 5
})

const tableData = reactive({
  list: [],
  total: 0
})

// 获取订单列表
const getOrderList = async () => {
  try {
    const params = {
      ...formData,
      create_time: formData.create_time
        ? JSON.stringify(formData.create_time)
        : null
    }
    const data = await getOrderListAPI(params)
    tableData.list = data.list
    tableData.total = data.total
  } catch (err: any) {
    ElNotification({
      title: "失败",
      message: err.error_message,
      type: "error"
    })
  }
}

// 查询
const handleSearch = () => {
  formData.page_no = 1
  getOrderList()
}

// 重置
const handleReset = () => {
  formData.goods_id = ""
  formData.classification_id = ""
  formData.create_time = ""
  formData.seller_id = ""
  handleSearch()
}

getOrderList()
</script>

<style scoped lang="scss">
.el-input,
.el-select {
  width: 260px;
}
</style>
