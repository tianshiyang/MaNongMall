import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUserMenuAPI } from "@/api/user"
import { ElNotification } from "element-plus"

export const useUserMenuStore = defineStore('userMenu', () => {
  const data = ref()
  // 获取用户菜单
  const getUserMenu = async () => {
    try {
      data.value = await getUserMenuAPI() 
    } catch (err: any) {
      ElNotification({
        title: '失败',
        message: err.error_message,
        type: 'error',
      })
    }
  }
  return { data, getUserMenu }
})
