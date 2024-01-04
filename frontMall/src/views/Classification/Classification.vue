<template>
  <section class="table-button-group">
    <el-button
      type="primary"
      @click="handleCreateClassification"
    >
      新增分类
    </el-button>
  </section>

  <el-table
    :data="tableData.list"
    border
  >
    <el-table-column
      prop="classification_name"
      label="分类名称"
    />
    <el-table-column
      prop="classification_remark"
      label="分类描述"
    />
    <el-table-column label="可售卖的角色">
      <template #default="{ row }">
        <p
          v-for="item in row.role_list"
          :key="item.id"
        >
          {{ item.role_name }}
        </p>
      </template>
    </el-table-column>
    <el-table-column
      prop="create_time"
      label="创建时间"
    />
    <el-table-column
      prop="date"
      label="操作"
    >
      <template #default="{ row }">
        <el-button
          type="primary"
          link
          @click="handleUpdateClassification(row.id)"
        >
          编辑
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
    @size-change="getClassificationList"
    @current-change="getClassificationList"
  />

  <!-- 新增编辑分类 -->
  <UpdateClassification
    v-model="updateClassificationFormData.visible"
    v-if="updateClassificationFormData.visible"
    :classification_id="updateClassificationFormData.classification_id"
    @updateSuccess="getClassificationList"
  />
</template>

<script lang="ts" setup>
import { reactive } from "vue"
import { getClassificationListAPI } from "@/api/goods"
import { ElNotification } from "element-plus"
import UpdateClassification from "./components/UpdateClassification.vue"

const formData = reactive({
  page_size: 5,
  page_no: 1
})

const tableData = reactive({
  list: [],
  total: 0
})

// 获取分类列表
const getClassificationList = async () => {
  try {
    const data = await getClassificationListAPI(formData)
    tableData.list = data.list
    tableData.total = data.total
  } catch (e: any) {
    ElNotification({
      title: "失败",
      message: e.error_message,
      type: "error"
    })
  }
}

// 更新分类弹窗数据源
const updateClassificationFormData = reactive({
  visible: false,
  classification_id: ""
})

// 新增分类
const handleCreateClassification = () => {
  updateClassificationFormData.classification_id = ""
  updateClassificationFormData.visible = true
}

// 打开编辑分类弹窗
const handleUpdateClassification = (classification_id: string) => {
  updateClassificationFormData.classification_id = classification_id
  updateClassificationFormData.visible = true
}

getClassificationList()
</script>
