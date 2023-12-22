<template>
  <el-tree-select
    v-model="selectedValue"
    :data="treeDataList"
    multiple
    :render-after-expand="false"
    show-checkbox
  />
</template>

<script lang="ts" setup>
import { defineProps, ref, watch } from "vue"
import { getMenuTreeAPI } from "@/api/setting"
import { ElNotification } from "element-plus"

const props = defineProps({
  modelValue: Array
})

// 当前选中的值
const selectedValue = ref(props.modelValue)

// 树的数据源
const treeDataList = ref<any>([])

// 转化树为对应的格式
const transformTree: (data: any[]) => any[] = (data: any[]) => {
  return data.map((item: any) => {
    return {
      label: item.menu_name,
      value: item.id,
      children: item.children ? transformTree(item.children) : []
    }
  })
}

// 获取菜单树形结构
const getMenuTree = async () => {
  try {
    const data = await getMenuTreeAPI()
    treeDataList.value = transformTree(data.list)
  } catch (err: any) {
    ElNotification({
      title: "失败",
      message: err.error_message,
      type: "error"
    })
  }
}

watch(
  () => props.modelValue,
  () => (selectedValue.value = props.modelValue)
)

// 初始化
getMenuTree()
</script>
