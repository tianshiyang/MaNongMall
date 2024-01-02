<template>
  <el-dialog
    v-model="visible"
    :title="props.classification_id ? '编辑分类' : '新增分类'"
    @closed="handleClose"
    :validate-on-rule-change="false"
  >
    <el-form
      :model="formData"
      label-width="140px"
      :rules="rules"
      ref="UpdateClassificationRef"
    >
      <el-form-item
        prop="classification_name"
        label="分类名称"
      >
        <el-input
          v-model="formData.classification_name"
          placeholder="请输入分类名称"
          clearable
        />
      </el-form-item>
      <el-form-item
        prop="classification_remark"
        label="分类描述"
      >
        <el-input
          v-model="formData.classification_remark"
          placeholder="请输入分类描述"
          clearable
        />
      </el-form-item>
      <el-form-item
        prop="role_list"
        label="分类绑定的角色"
      >
        <RoleSelect v-model="formData.role_list" />
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
import { ElNotification } from "element-plus"
import RoleSelect from "@/views/Settings/components/RoleSelect.vue"
import {
  updateClassificationAPI,
  getClassificationDetailAPI
} from "@/api/goods/index"

const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void
  (event: "updateSuccess"): void
}>()

const props = defineProps({
  modelValue: Boolean,
  classification_id: {
    // 当前分类的id, 如果有ID则为编辑，没有则为新增
    type: [Number, String],
    required: true
  }
})

const visible = ref(true)

// 表单实例
const UpdateClassificationRef = ref()

// 表单数据源
const formData = reactive({
  classification_name: "", // 分类名称
  classification_remark: "", // 分类描述
  role_list: [] // 分类绑定的角色
})

// 表单校验规则
const rules = {
  classification_name: [
    { required: true, message: "请输入分类名称", trigger: "change" }
  ],
  classification_remark: [
    { required: true, message: "请输入分类描述", trigger: "change" }
  ],
  role_list: [
    { required: true, message: "请选择分类绑定的角色", trigger: "change" }
  ]
}

// 获取分类详情
const getClassificationDetail = async () => {
  try {
    const data = await getClassificationDetailAPI({
      classification_id: props.classification_id
    })
    formData.classification_name = data.classification_name
    formData.classification_remark = data.classification_remark
    formData.role_list = data.role_list
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
  await UpdateClassificationRef.value.validate(async (valid: boolean) => {
    if (valid) {
      const data = {
        ...formData,
        role_list: JSON.stringify(formData.role_list),
        classification_id: props.classification_id
      }
      try {
        await updateClassificationAPI(data)
        ElNotification({
          title: "成功",
          message: props.classification_id ? "编辑成功" : "新增成功",
          type: "success"
        })
        emit("update:modelValue", false)
        emit("updateSuccess")
      } catch (err) {
        ElNotification({
          title: "失败",
          message: "更新失败",
          type: "error"
        })
      }
    }
  })
}

// 初始化
const initData = () => {
  if (props.classification_id) {
    getClassificationDetail()
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
