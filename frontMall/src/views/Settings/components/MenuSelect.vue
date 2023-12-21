<template>
  <el-select
    v-model="formData.modelValue"
    multiple
    filterable
    remote
    reserve-keyword
    placeholder="请输入菜单名称"
    :remote-method="getMenuAllList"
    :loading="formData.loading"
  >
    <el-option
      v-for="item in menuList"
      :key="item.id"
      :label="item.menu_name"
      :value="item.id"
    />
  </el-select>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue"
import { getMenuListAPI } from "@/api/user/index"
import { ElNotification } from "element-plus"

const props = defineProps({
  modelValue: [Number, String]
})

// 定义数据源
const formData = reactive({
  modelValue: props.modelValue,
  loading: false
})

const menuList = ref<any[]>([])

// 请求获取菜单列表
const getMenuAllList = (menu_name: string) => {
  const params = {
    menu_name: menu_name,
    page_no: 1,
    page_size: 10
  }
  getMenuListAPI(params)
    .then((res) => {
      menuList.value = res.list
    })
    .catch((err) => {
      ElNotification({
        title: "失败",
        message: err.error_message,
        type: "error"
      })
    })
}
</script>
