<template>
  <el-dialog
    v-model="visible"
    :title="props.menu_id ? '编辑菜单' : '创建菜单'"
    @closed="handleClose"
    :validate-on-rule-change="false"
  >
    <el-form
      :model="formData"
      label-width="120px"
      :rules="rules"
      ref="UpdateMenuRef"
    >
      <el-form-item
        prop="menu_name"
        label="菜单名称"
      >
        <el-input
          v-model="formData.menu_name"
          placeholder="请输入菜单名称"
          clearable
        />
      </el-form-item>
      <el-form-item
        prop="menu_path"
        label="菜单路径"
      >
        <el-input
          v-model="formData.menu_path"
          placeholder="请输入菜单路径"
          clearable
        />
      </el-form-item>
      <el-form-item label="父级菜单">
        <MenuSelect
          v-model="formData.menu_parent"
          v-model:menu_name="formData.menu_parent_name"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button
        type="primary"
        @click="handleCommit"
      >
        提交
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import MenuSelect from "../../components/MenuSelect.vue"
import { getMenuDetailAPI, UpdateMenuAPI } from "@/api/user/index"
import { ElNotification } from "element-plus"

const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void
  (event: "updateSuccess"): void
}>()

const props = defineProps({
  modelValue: Boolean,
  menu_id: {
    // 当前菜单的id, 如果有ID则为编辑，没有则为新增
    type: [Number, String],
    required: true
  }
})

const visible = ref(true)

// 表单实例
const UpdateMenuRef = ref()

// 表单数据源
const formData = reactive({
  menu_name: "", // 菜单名称
  menu_path: "", // 菜单路径
  menu_parent: "", // 父级菜单
  menu_parent_name: "" // 父级菜单的名称
})

// 表单校验规则
const rules = {
  menu_name: [{ required: true, message: "请输入菜单名称", trigger: "change" }],
  menu_path: [{ required: true, message: "请输入菜单路径", trigger: "change" }]
}

// 获取订单详情
const getOrderDetail = async () => {
  try {
    const data = await getMenuDetailAPI({ menu_id: props.menu_id })
    formData.menu_name = data.menu_name
    formData.menu_path = data.menu_path
    formData.menu_parent = data.menu_parent
    formData.menu_parent_name = data.menu_parent_name
  } catch (e: any) {
    ElNotification({
      title: "失败",
      message: e.error_message,
      type: "error"
    })
  }
}

// 关闭
const handleClose = () => {
  emit("update:modelValue", false)
}

// 提交
const handleCommit = async () => {
  await UpdateMenuRef.value.validate((valid: boolean) => {
    if (valid) {
      const params = {
        menu_id: props.menu_id,
        menu_name: formData.menu_name,
        menu_path: formData.menu_path,
        menu_parent: formData.menu_parent
      }
      UpdateMenuAPI(params)
        .then(() => {
          let message = ""
          if (props.menu_id) {
            message = "编辑成功"
          } else {
            message = "创建成功"
          }
          ElNotification({
            title: "成功",
            message,
            type: "success"
          })
          emit("updateSuccess")
          handleClose()
        })
        .catch((err: any) => {
          ElNotification({
            title: "失败",
            message: err.error_message,
            type: "error"
          })
        })
    }
  })
}

// 初始化
const initData = () => {
  if (props.menu_id) {
    getOrderDetail()
  }
}

watch(
  () => props.modelValue,
  () => (visible.value = props.modelValue)
)

initData()
</script>

<style lang="scss" scoped>
:deep(.el-input, .el-select) {
  width: 260px;
}
</style>
