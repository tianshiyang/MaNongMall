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

  <div class="table-button-group">
    <el-button
      type="primary"
      @click="handleAddPermission"
    >
      新增权限
    </el-button>
  </div>

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
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button
          type="primary"
          link
          @click="handleDeletePermission(row.id)"
        >
          删除
        </el-button>
        <el-button
          type="primary"
          link
          @click="handleUpdatePermission(row.id)"
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
    @size-change="getPermissionList"
    @current-change="getPermissionList"
  />

  <!-- 更新权限 -->
  <UpdatePermission
    v-if="updatePermissionData.visible"
    v-model="updatePermissionData.visible"
    :permission_id="updatePermissionData.permission_id"
    @updateSuccess="getPermissionList"
  />
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue"
import PermissionSelect from "../components/PermissionSelect.vue"
import { getPermissionListAPI, deletePermissionAPI } from "@/api/setting"
import { ElNotification, ElMessageBox } from "element-plus"
import UpdatePermission from "./components/UpdatePermission.vue"

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

// 删除
const handleDeletePermission = (permission_id: number) => {
  ElMessageBox.confirm("确定删除该权限吗？", "提示").then(async () => {
    try {
      await deletePermissionAPI({ permission_id })
      ElNotification({
        title: "成功",
        message: "删除权限成功",
        type: "success"
      })
      getPermissionList()
    } catch (e: any) {
      ElNotification({
        title: "失败",
        message: e.error_message,
        type: "error"
      })
    }
  })
}

// 编辑权限数据源
const permission_id = ref<number | string>("")
const updatePermissionData = reactive({
  visible: false,
  permission_id
})

// 编辑权限
const handleUpdatePermission = (permission_id: number) => {
  updatePermissionData.permission_id = permission_id
  updatePermissionData.visible = true
}

// 新增权限
const handleAddPermission = () => {
  updatePermissionData.permission_id = ""
  updatePermissionData.visible = true
}

// 初始化
getPermissionList()
</script>
