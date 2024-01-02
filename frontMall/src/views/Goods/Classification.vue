<template>
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
    />
  </el-table>
</template>

<script lang="ts" setup>
import { reactive } from "vue"
import { getClassificationListAPI } from "@/api/goods"
import { ElNotification } from "element-plus"

const tableData = reactive({
  list: [],
  total: 0
})

const getClassificationList = async () => {
  try {
    const data = await getClassificationListAPI()
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

getClassificationList()
</script>
