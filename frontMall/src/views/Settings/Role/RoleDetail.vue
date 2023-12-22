<template>
  <el-form
    :model="formData"
    :rules="rules"
    label-width="100px"
  >
    <el-form-item
      prop="role_name"
      label="角色名称"
    >
      <el-input
        v-model="formData.role_name"
        placeholder="请输入角色名称"
        clearable
      />
    </el-form-item>
    <el-form-item
      prop="role_sign"
      label="角色标识"
    >
      <el-input
        v-model="formData.role_sign"
        placeholder="请输入角色标识"
        clearable
      />
    </el-form-item>
    <el-form-item
      prop="role_remark"
      label="角色描述"
    >
      <el-input
        v-model="formData.role_remark"
        placeholder="请输入角色描述"
        clearable
      />
    </el-form-item>
    <el-form-item label="角色描述">
      <RoleMenuTree v-model="formData.role_menu" />
    </el-form-item>
    <el-form-item label="配置菜单">
      <el-input
        v-model="formData.role_remark"
        placeholder="请输入角色描述"
        clearable
      />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive } from "vue"
import { useRoute } from "vue-router"
import { getRoleDetailAPI } from "@/api/setting"
import { ElNotification } from "element-plus"
import RoleMenuTree from "./components/RoleMenuTree.vue"

// 获取路由实例
const route = useRoute()

const formData = reactive({
  role_id: "", // 角色ID
  role_name: "", // 角色名称
  role_sign: "", // 角色标识
  role_remark: "", // 角色描述
  role_menu: [], // 角色对应的菜单列表
  permission_role: [] // 角色对应的权限列表
})

const rules = {
  role_name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
  role_sign: [{ required: true, message: "角色标识不能为空", trigger: "blur" }],
  role_remark: [{ required: true, message: "请输入角色描述", trigger: "blur" }]
}

// 获取角色详情数据
const getRoleDetail = async () => {
  // 编辑或者详情的时候，调用获取角色详情的接口
  if (!formData.role_id) {
    return
  }
  try {
    const data = await getRoleDetailAPI({
      role_id: route.query.role_id as string
    })
    formData.role_name = data.role_name
    formData.role_sign = data.role_sign
    formData.role_remark = data.role_remark
    formData.role_menu = data.role_menu?.map((item: any) => item.id)
    formData.permission_role = data.permission_role
  } catch (err: any) {
    ElNotification({
      title: "失败",
      message: err.error_message,
      type: "error"
    })
  }
}

// 获取页面参数
const getRouteParams = () => {
  if (route.query.role_id) {
    formData.role_id = route.query.role_id as string
  }
}

// 初始化
getRouteParams()
getRoleDetail()
</script>
