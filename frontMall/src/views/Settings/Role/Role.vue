<template>
  <el-form inline>
    <el-form-item label="角色名称">
      <RoleSelect v-model="formData.role_id" />
    </el-form-item>
    <el-form-item label="角色标识">
      <el-input
        v-model="formData.role_sign"
        clearable
        placeholder="请输入角色标识"
      />
    </el-form-item>
    <el-form-item label="创建时间">
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

  <div class="table-button-group">
    <el-button
      type="primary"
      @click="goRoleDetail({ type: 'add' })"
    >
      新增角色
    </el-button>
  </div>

  <el-table
    :data="tableData.list"
    border
  >
    <el-table-column
      prop="role_name"
      label="角色名称"
    />
    <el-table-column
      prop="role_sign"
      label="角色标识"
    />
    <el-table-column
      prop="role_remark"
      label="角色描述"
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
          @click="handleDeleteRole(row.id)"
        >
          删除
        </el-button>
        <el-button
          type="primary"
          link
          @click="goRoleDetail({ role_id: row.id, type: 'edit' })"
        >
          编辑
        </el-button>
        <el-button
          type="primary"
          link
          @click="goRoleDetail({ role_id: row.id, type: 'show' })"
        >
          查看
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
    @size-change="getRoleList"
    @current-change="getRoleList"
  />
</template>

<script lang="ts" setup>
import { reactive } from "vue"
import { getRoleListAPI, deleteRoleAPI } from "@/api/setting"
import RoleSelect from "../components/RoleSelect.vue"
import { ElMessageBox, ElNotification } from "element-plus"
import { defaultTime } from "@/utils/DataFormat"
import { useRouter } from "vue-router"

const router = useRouter()

// 表单数据源
const formData = reactive({
  role_id: "", // 角色id
  role_sign: "", // 角色标识
  create_time: "",
  page_no: 1,
  page_size: 5
})

// 表格数据源
const tableData = reactive({
  list: [],
  total: 0
})

// 获取角色列表
const getRoleList = async () => {
  try {
    const params = {
      ...formData,
      create_time: formData.create_time
        ? JSON.stringify(formData.create_time)
        : null
    }
    const data = await getRoleListAPI(params)
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

// 搜索
const handleSearch = () => {
  formData.page_no = 1
  getRoleList()
}

// 重置
const handleReset = () => {
  formData.role_id = ""
  formData.role_sign = ""
  formData.create_time = ""
}

// 删除角色
const handleDeleteRole = (role_id: number | string) => {
  ElMessageBox.confirm("确定删除该角色吗？", "提示").then(async () => {
    try {
      await deleteRoleAPI({ role_id })
      ElNotification({
        title: "成功",
        message: "删除角色成功",
        type: "success"
      })
      getRoleList()
    } catch (e: any) {
      ElNotification({
        title: "失败",
        message: e.error_message,
        type: "error"
      })
    }
  })
}

// 跳转到详情
const goRoleDetail = ({
  role_id,
  type
}: {
  role_id?: string | number
  type: "show" | "edit" | "add"
}) => {
  router.push({
    path: "/role-detail",
    query: {
      role_id,
      type
    }
  })
}

// 初始化
getRoleList()
</script>

<style scoped lang="scss">
.el-input,
.el-select {
  width: 260px;
}
</style>
