<template>
  <el-form
    inline
    label-width="100px"
  >
    <el-form-item label="商品名称">
      <GoodsSelect v-model="formData.goods_id" />
    </el-form-item>
    <el-form-item label="商品分类">
      <ClassificationSelectBySeller v-model="formData.goods_classification" />
    </el-form-item>
    <el-form-item label="是否有库存">
      <el-select
        v-model="formData.has_inventory"
        clearable
        placeholder="是否有库存"
      >
        <el-option
          label="是"
          :value="true"
        />
        <el-option
          label="否"
          :value="false"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="是否折扣期内">
      <el-select
        v-model="formData.is_in_discount_time"
        clearable
        placeholder="是否折扣期内"
      >
        <el-option
          label="是"
          :value="true"
        />
        <el-option
          label="否"
          :value="false"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="上架状态">
      <el-select
        v-model="formData.listing_status"
        clearable
        placeholder="请选择是否上架"
      >
        <el-option
          label="已上架"
          :value="true"
        />
        <el-option
          label="未上架"
          :value="false"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="商品创建时间">
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

  <section class="table-button-group">
    <el-button
      type="primary"
      @click="handleCreateGoods"
      v-if="hasPermission('CREATE_GOODS')"
    >
      新增商品
    </el-button>
  </section>

  <el-table
    :data="tableData.list"
    border
  >
    <el-table-column
      prop="goods_name"
      label="商品名称"
      fixed="left"
    />
    <el-table-column
      prop="goods_classification_name"
      label="商品分类"
      fixed="left"
    />
    <el-table-column
      prop="purchase_price"
      v-if="hasPermission('SHOW_PURCHASE_PRICE')"
      label="商品进价"
    />
    <el-table-column
      prop="price"
      label="商品售价"
    />
    <el-table-column
      prop="current_price"
      label="商品现价"
    />
    <el-table-column
      prop="inventory"
      label="库存"
    />
    <el-table-column label="折扣">
      <template #default="{ row }">
        <div v-if="Number(row.discount) === 1 || !row.discount">暂无</div>
        <div v-else>{{ Number(row.discount) * 10 }}折</div>
      </template>
    </el-table-column>
    <el-table-column label="折扣时间">
      <template #default="{ row }">
        <div v-if="row.discount_time_start">
          {{ row.discount_time_start }} - {{ row.discount_time_end }}
        </div>
        <div v-else>--</div>
      </template>
    </el-table-column>
    <el-table-column
      width="120px"
      label="是否折扣期内"
    >
      <template #default="{ row }">
        {{ row.is_discount ? "是" : "否" }}
      </template>
    </el-table-column>
    <el-table-column
      width="120px"
      label="商品上架状态"
    >
      <template #default="{ row }">
        <div v-if="hasPermission('GOODS_LISTING_STATUS')">
          <el-switch
            v-model="row.listing_status"
            @change="handleUpdateListingStatus(row)"
          />
        </div>
        <div v-else>{{ row.listing_status ? "已上架" : "未上架" }}</div>
      </template>
    </el-table-column>
    <el-table-column
      prop="create_time"
      width="120px"
      label="商品创建时间"
    />
    <el-table-column
      fixed="right"
      label="操作"
      width="240"
    >
      <template #default="{ row }">
        <el-button
          type="primary"
          link
          v-if="hasPermission('CREATE_ORDER')"
          @click="handleAddOrder(row)"
        >
          新增订单
        </el-button>
        <el-button
          type="primary"
          link
          v-if="hasPermission('UPDATE_GOODS')"
          @click="handleUpdateGoods(row)"
        >
          编辑商品
        </el-button>
        <el-button
          type="primary"
          link
          v-if="hasPermission('UPDATE_INVENTORY')"
          @click="updateInventory(row)"
        >
          更新库存
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
    class="el-pagination-class"
    v-model:current-page="formData.page_no"
    v-model:page-size="formData.page_size"
    :page-sizes="[2, 5, 10, 20]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="tableData.total"
    @size-change="getGoodsList"
    @current-change="getGoodsList"
  />

  <!-- 编辑、创建商品 -->
  <UpdateGoods
    v-model="updateGoodsFormData.visible"
    v-if="updateGoodsFormData.visible"
    :goods_id="updateGoodsFormData.goods_id"
    @updateSuccess="getGoodsList"
    @close="updateGoodsFormData.goods_id = ''"
  />

  <!-- 更新库存 -->
  <UpdateGoodsInventory
    v-model="updateInventoryFormData.visible"
    v-if="updateInventoryFormData.visible"
    :goods_id="updateInventoryFormData.goods_id"
    @updateSuccess="getGoodsList"
  />

  <AddGoods
    v-model="addOrderFormData.visible"
    v-if="addOrderFormData.visible"
    :goods_id="addOrderFormData.goods_id"
    @updateSuccess="getGoodsList"
  />
</template>

<script lang="ts" setup>
import { computed, reactive } from "vue"
import GoodsSelect from "../Components/GoodsSelect.vue"
import ClassificationSelectBySeller from "../Components/ClassificationSelectBySeller.vue"
import { defaultTime } from "@/utils/DataFormat"
import { getGoodsListAPI, updateGoodsStatusAPI } from "@/api/goods"
import { ElNotification } from "element-plus"
import UpdateGoods from "./components/UpdateGoods.vue"
import UpdateGoodsInventory from "./components/UpdateGoodsInventory.vue"
import AddGoods from "../Order/components/AddGoods.vue"
import { useUserPermissionStore } from "@/stores/useUserPermission"

const permissionStore = useUserPermissionStore()

// 判断用户是否具有某个权限
const hasPermission = computed(() => {
  return (val: string) => {
    return permissionStore.permissionList.includes(val)
  }
})

// 表单数据源
const formData = reactive({
  goods_id: "", // 商品ID
  goods_classification: "", // 商品分类ID
  has_inventory: "", // 是否有库存
  is_in_discount_time: "", // 是否折扣期内
  create_time: "", // 创建时间
  listing_status: "", // 上架状态
  page_no: 1,
  page_size: 5
})

// 表格数据源
const tableData = reactive({
  list: [],
  total: 0
})

// 获取数据
const getGoodsList = async () => {
  try {
    const params = {
      ...formData,
      create_time: formData.create_time
        ? JSON.stringify(formData.create_time)
        : null
    }
    const data = await getGoodsListAPI(params)
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
  getGoodsList()
}

// 重置
const handleReset = () => {
  formData.goods_id = ""
  formData.goods_classification = ""
  formData.has_inventory = ""
  formData.is_in_discount_time = ""
  formData.create_time = ""
  formData.listing_status = ""
  handleSearch()
}

// 更新上架状态
const handleUpdateListingStatus = async ({
  id,
  listing_status
}: {
  id: number
  listing_status: boolean
}) => {
  try {
    const data = {
      goods_id: id,
      listing_status
    }
    await updateGoodsStatusAPI(data)
    ElNotification({
      title: "成功",
      message: "更新成功！",
      type: "success"
    })
  } catch (err: any) {
    ElNotification({
      title: "失败",
      message: err.error_message,
      type: "error"
    })
    getGoodsList()
  }
}

// 新增编辑商品数据源
const updateGoodsFormData = reactive({
  goods_id: "",
  visible: false
})

// 新增商品
const handleCreateGoods = () => {
  updateGoodsFormData.visible = true
}

// 编辑商品
const handleUpdateGoods = (row: any) => {
  updateGoodsFormData.visible = true
  updateGoodsFormData.goods_id = row.id
}

// 更新库存数据源
const updateInventoryFormData = reactive({
  goods_id: "",
  visible: false
})

// 更新库存
const updateInventory = (row: any) => {
  updateInventoryFormData.goods_id = row.id
  updateInventoryFormData.visible = true
}

// 新增订单数据源
const addOrderFormData = reactive({
  visible: false,
  goods_id: ""
})

// 新增订单
const handleAddOrder = (row: any) => {
  addOrderFormData.goods_id = row.id
  addOrderFormData.visible = true
}

getGoodsList()
</script>

<style lang="scss" scoped>
.el-select,
.el-input {
  width: 260px;
}
</style>
