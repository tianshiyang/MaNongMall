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
        搜索
      </el-button>
      <el-button @click="handleReset">重置</el-button>
    </el-form-item>
  </el-form>

  <div class="table-button-group">
    <el-button
      type="primary"
      @click="handleAddMenu"
    >
      新增菜单
    </el-button>
  </div>

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
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button
          type="primary"
          link
          @click="handleEditMenu(row.id)"
        >
          编辑
        </el-button>
        <el-button
          type="primary"
          link
          @click="handleDeleteMenu(row.id)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
    class="el-pagination-class"
    v-model:current-page="form.page_no"
    v-model:page-size="form.page_size"
    :page-sizes="[2, 5, 10, 20]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="tableData.total"
    @size-change="getMenuList"
    @current-change="getMenuList"
  />

  <UpdateMenu
    v-if="editData.visible"
    v-model="editData.visible"
    :menu_id="editData.menu_id"
    @updateSuccess="getMenuList"
  />
</template>

<script lang="ts" setup>
import { defaultTime } from "@/utils/DataFormat"
import { reactive, ref } from "vue"
import MenuSelect from "../components/MenuSelect.vue"
import { getMenuListAPI, deleteMenuAPI } from "@/api/setting"
import { ElMessageBox, ElNotification } from "element-plus"
import UpdateMenu from "./components/UpdateMenu.vue"

// 表单搜索数据源
const form = reactive({
  menu_name: "", // 菜单名称
  menu_path: "", // 菜单路径
  menu_parent: "", // 父级菜单
  create_time: null, // 创建时间
  page_no: 1,
  page_size: 5
})

// 表格数据源
const tableData = reactive({
  list: [],
  total: 1
})

// 获取菜单列表
const getMenuList = () => {
  const data = {
    ...form,
    create_time: form.create_time ? JSON.stringify(form.create_time) : null
  }
  getMenuListAPI(data)
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
  form.create_time = null
  handleSearch()
}

// 初始化
const initPageData = () => {
  getMenuList()
}

// 删除
const handleDeleteMenu = (menu_id: number) => {
  ElMessageBox.confirm("确定删除该菜单吗？", "提示").then(async () => {
    try {
      await deleteMenuAPI({ menu_id })
      ElNotification({
        title: "成功",
        message: "删除菜单成功",
        type: "success"
      })
      getMenuList()
    } catch (e: any) {
      ElNotification({
        title: "失败",
        message: e.error_message,
        type: "error"
      })
    }
  })
}

// 编辑的数据源
const menu_id = ref<string | number>("")
const editData = reactive({
  visible: false,
  menu_id
})

// 编辑菜单
const handleEditMenu = (menu_id: number) => {
  editData.visible = true
  editData.menu_id = menu_id
}

// 新增菜单
const handleAddMenu = () => {
  editData.visible = true
  editData.menu_id = ""
}

// 初始化
initPageData()
</script>

<style lang="scss" scoped></style>
