import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUserPermissionAPI } from "@/api/user"
import { ElNotification } from "element-plus"

export const useUserPermissionStore = defineStore('userPermission', () => {
  // 用户所有的权限
  const permissionList = ref<any[]>([])

  // 获取用户权限
  const getUserPermission = async () => {
    try {
      const data = await getUserPermissionAPI()
      permissionList.value = data?.map((item: any) => item.permission_sign)
    } catch (err: any) {
      ElNotification({
        title: '失败',
        message: err.error_message,
        type: 'error',
      })
    }
  }
  return { permissionList, getUserPermission }
})
