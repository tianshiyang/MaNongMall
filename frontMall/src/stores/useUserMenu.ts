import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUserMenuAPI } from "@/api/user"
import { ElNotification } from "element-plus"

export const useUserMenuStore = defineStore('userMenu', () => {
  // 平铺后的菜单，仅包含menu_path
  const flatMenu = ref<any[]>([])
  const transformMenuTree = (menuList: any[]) => {
    return menuList.forEach((item: any) => {
      if (item?.children?.length) {
        transformMenuTree(item.children)
      }
      flatMenu.value.push(item.menu_name)
    })
  }

  // 获取用户菜单
  const menuList = ref()
  const getUserMenu = async () => {
    try {
      menuList.value = await getUserMenuAPI() 
      transformMenuTree(menuList.value)
    } catch (err: any) {
      ElNotification({
        title: '失败',
        message: err.error_message,
        type: 'error',
      })
    }
  }
  return { menuList, flatMenu, getUserMenu }
})
