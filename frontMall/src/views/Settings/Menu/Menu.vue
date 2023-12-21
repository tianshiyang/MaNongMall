<template>
  <el-form inline>
    <el-form-item label="菜单名称">
      <el-input
        v-model="form.menu_name"
        clearable
        placeholder="请输入菜单名称"
      />
    </el-form-item>
    <el-form-item label="菜单路径">
      <el-input
        v-model="form.menu_path"
        clearable
        placeholder="请输入菜单路径"
      />
    </el-form-item>
    <el-form-item label="父级菜单">
      <MenuSelect v-model="form.menu_parent" />
    </el-form-item>
    <el-form-item label="创建时间">
      <el-date-picker
        v-model="form.create_time"
        type="daterange"
        range-separator="到"
        value-format="YYYY-MM-DD HH:mm:ss"
        format="YYYY-MM-DD"
        time-format="YYYY-MM-DD"
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
        搜索
      </el-button>
      <el-button @click="handleReset">重置</el-button>
    </el-form-item>
  </el-form>

  <el-table
    :data="tableData.list"
    border
  >
    <el-table-column
      prop="id"
      label="菜单ID"
    />
    <el-table-column
      prop="menu_name"
      label="菜单名称"
    />
    <el-table-column
      prop="menu_path"
      label="菜单路径"
    />
    <el-table-column
      prop="menu_parent_name"
      label="父级菜单"
    />
    <el-table-column
      prop="create_time"
      label="创建时间"
    />
  </el-table>
</template>

<script lang="ts" setup>
import { defaultTime } from "@/utils/DataFormat"
import { reactive } from "vue"
import MenuSelect from "../components/MenuSelect.vue"
import { getMenuListAPI } from "@/api/user"
import { ElNotification } from "element-plus"

// 表单搜索数据源
const form = reactive({
  menu_name: "", // 菜单名称
  menu_path: "", // 菜单路径
  menu_parent: "", // 父级菜单
  create_time: [], // 创建时间
  page_no: 1,
  page_size: 10
})

// 表格数据源
const tableData = reactive({
  list: [],
  total: 1
})

// 获取菜单列表
const getMenuList = () => {
  getMenuListAPI(form)
    .then((res) => {
      tableData.list = res.list
      tableData.total = res.total
    })
    .catch((err) => {
      ElNotification({
        title: "失败",
        message: err.error_message,
        type: "error"
      })
    })
}

// 搜索
const handleSearch = () => {
  form.page_no = 1
  getMenuList()
}

// 重置
const handleReset = () => {
  form.menu_name = ""
  form.menu_parent = ""
  form.menu_path = ""
  form.create_time = []
  handleSearch()
}

// 初始化
const initPageData = () => {
  getMenuList()
}

initPageData()
</script>

<style lang="scss" scoped></style>
