<template>
  <el-form inline>
    <el-form-item label="权限名称">
      <PermissionSelect v-model="formData.permission_id" />
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
      prop="permission_name"
      label="权限名称"
    />
    <el-table-column
      prop="permission_sign"
      label="权限标识"
    />
    <el-table-column
      prop="permission_remark"
      label="权限描述"
    />
    <el-table-column
      prop="create_time"
      label="创建时间"
    />
    <el-table-column label="操作" />
  </el-table>

  <el-pagination
    class="el-pagination-class"
    v-model:current-page="formData.page_no"
    v-model:page-size="formData.page_size"
    :page-sizes="[2, 5, 10, 20]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="tableData.total"
    @size-change="getPermissionList"
    @current-change="getPermissionList"
  />
</template>

<script lang="ts" setup>
import { reactive } from "vue"
import PermissionSelect from "../components/PermissionSelect.vue"
import { getPermissionListAPI } from "@/api/setting"
import { ElNotification } from "element-plus"

// 表单数据源
const formData = reactive({
  permission_id: "", // 权限名称
  page_no: 1,
  page_size: 5
})

// 表格数据源
const tableData = reactive({
  list: [],
  total: 0
})

// 获取权限列表
const getPermissionList = async () => {
  try {
    const data = await getPermissionListAPI(formData)
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
  getPermissionList()
}

// 重置
const handleReset = () => {
  formData.permission_id = ""
  handleSearch()
}

// 初始化
getPermissionList()
</script>
