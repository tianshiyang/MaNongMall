<template>
  <el-form
    inline
    label-width="100px"
  >
    <el-form-item label="员工姓名">
      <UserSelect v-model="formData.user_id" />
    </el-form-item>
    <el-form-item label="员工手机号">
      <el-input
        v-model="formData.mobile"
        placeholder="请输入员工手机号"
        clearable
      />
    </el-form-item>
    <el-form-item label="员工角色">
      <RoleSelect v-model="formData.role_id" />
    </el-form-item>
    <el-form-item label="是否离职">
      <el-select
        v-model="formData.is_depart"
        placeholder="请选择是否离职"
        clearable
      >
        <el-option
          label="是"
          :value="1"
        />
        <el-option
          label="否"
          :value="0"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="入职时间">
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
      <el-button type="primary">重置</el-button>
    </el-form-item>
  </el-form>

  <section class="table-button-group">
    <el-button
      type="primary"
      @click="handleCreateUser"
    >
      新增人员
    </el-button>
  </section>

  <el-table
    :data="tableData.list"
    border
  >
    <el-table-column
      prop="username"
      label="员工姓名"
    />
    <el-table-column
      prop="phone"
      label="手机号"
    />
    <el-table-column
      prop="id_number"
      label="身份证号"
    />
    <el-table-column
      prop="account_number"
      label="账号"
    />
    <el-table-column label="是否离职">
      <template #default="{ row }">
        {{ row.is_depart ? "是" : "否" }}
      </template>
    </el-table-column>
    <el-table-column
      prop="role_name"
      label="角色"
    >
      <template #default="{ row }">
        <p
          v-for="item in row?.role_list"
          :key="item.id"
        >
          {{ item.role_name }}
        </p>
      </template>
    </el-table-column>

    <el-table-column
      prop="create_time"
      label="入职时间"
    />
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button
          type="primary"
          link
          @click="handleUserDepart(row.id)"
        >
          离职
        </el-button>
        <el-button
          type="primary"
          link
          @click="handleUpdateUserPassword(row.id)"
        >
          修改密码
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
    @size-change="getUserlist"
    @current-change="getUserlist"
  />

  <!-- 创建员工 -->
  <CreateUser
    v-model="createUserVisible"
    v-if="createUserVisible"
    @updateSuccess="getUserlist"
  />

  <!-- 更新员工密码 -->
  <UpdateUserPassword
    v-model="updateUserPasswordForm.visible"
    :user_id="updateUserPasswordForm.user_id"
    v-if="updateUserPasswordForm.visible"
    @updateSuccess="getUserlist"
  />
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue"
import { getUserListAPI, userDepartAPI } from "@/api/setting"
import UserSelect from "../components/UserSelect.vue"
import RoleSelect from "../components/RoleSelect.vue"
import { ElNotification, ElMessageBox } from "element-plus"
import { defaultTime } from "@/utils/DataFormat"
import CreateUser from "./components/CreateUser.vue"
import UpdateUserPassword from "./components/UpdateUserPassword.vue"

const formData = reactive({
  user_id: "", // 员工姓名的ID值
  phone: "", // 员工手机号
  role_id: "", // 员工角色
  is_depart: "", // 是否离职
  create_time: "", // 入职时间
  page_no: 1,
  page_size: 5
})

// 表格数据源
const tableData = reactive({
  list: [],
  total: 0
})

// 获取人员列表
const getUserlist = async () => {
  try {
    const params = {
      ...formData,
      create_time: formData.create_time
        ? JSON.stringify(formData.create_time)
        : null
    }
    const data = await getUserListAPI(params)
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
  getUserlist()
}

// 创建员工数据源
const createUserVisible = ref(false)

// 创建员工
const handleCreateUser = () => {
  createUserVisible.value = true
}

// 员工离职
const handleUserDepart = (user_id: number) => {
  ElMessageBox.confirm("确定要离职该员工吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(async () => {
    try {
      await userDepartAPI({ user_id })
      ElNotification({
        title: "成功",
        message: "员工离职成功！",
        type: "success"
      })
      getUserlist()
    } catch (err: any) {
      ElNotification({
        title: "失败",
        message: err.error_message,
        type: "error"
      })
    }
  })
}

// 更新用户密码数据源
const updateUserPasswordForm = reactive({
  visible: false,
  user_id: ""
})
// 更新用户密码
const handleUpdateUserPassword = (user_id: string) => {
  updateUserPasswordForm.user_id = user_id
  updateUserPasswordForm.visible = true
}

// 初始化
getUserlist()
</script>

<style lang="scss" scoped>
.el-select,
.el-input {
  width: 260px;
}
</style>
