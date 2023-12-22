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
        :disabled="isShow"
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
        :disabled="isShow || isEdit"
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
        :disabled="isShow"
        v-model="formData.role_remark"
        placeholder="请输入角色描述"
        clearable
      />
    </el-form-item>
    <el-form-item label="配置菜单">
      <RoleMenuTree
        :disabled="isShow"
        v-model="formData.menu_list"
      />
    </el-form-item>
    <el-form-item label="配置权限">
      <PermissionTransfer
        :disabled="isShow"
        v-model="formData.permission_list"
      />
    </el-form-item>
  </el-form>

  <!-- 底部保存按钮 -->
  <section class="button-bottom-style">
    <el-button
      type="primary"
      @click="handleSave"
    >
      保存
    </el-button>
    <el-button @click="router.go(-1)">返回</el-button>
  </section>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { getRoleDetailAPI, updateRoleAPI } from "@/api/setting"
import { ElNotification } from "element-plus"
import RoleMenuTree from "./components/RoleMenuTree.vue"
import PermissionTransfer from "../Permission/components/PermissionTransfer.vue"

// 获取路由实例
const route = useRoute()
const router = useRouter()

// 页面类型
const pageType = ref<string>("")

// 页面是否是查看状态，如果是查看，则禁用所有操作
const isShow = computed(() => pageType.value === "show")

// 页面是否是编辑状态，编辑状态不可更改权限标识
const isEdit = computed(() => pageType.value === "edit")

const formData = reactive({
  role_id: "", // 角色ID
  role_name: "", // 角色名称
  role_sign: "", // 角色标识
  role_remark: "", // 角色描述
  menu_list: [], // 角色对应的菜单列表
  permission_list: [] // 角色对应的权限列表
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
    formData.menu_list = data.role_menu?.map((item: any) => item.id)
    formData.permission_list = data.permission_role.map(
      (res: any) => res.permission_id
    )
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
  if (route.query.type) {
    pageType.value = route.query.type as string
  }
}

// 保存
const handleSave = async () => {
  try {
    await updateRoleAPI(formData)
    ElNotification({
      title: "成功",
      message: "更改成功！",
      type: "success"
    })
    router.go(-1)
  } catch (err: any) {
    ElNotification({
      title: "失败",
      message: err.error_message,
      type: "error"
    })
  }
}

// 初始化
getRouteParams()
getRoleDetail()
</script>

<style lang="scss" scoped>
.button-bottom-style {
  float: right;
  margin: 20px;
}
</style>
