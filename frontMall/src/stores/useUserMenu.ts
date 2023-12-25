import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUserMenuAPI } from "@/api/user"
import { ElNotification } from "element-plus"

export const useUserMenuStore = defineStore('userMenu', () => {
  // 所有的菜单
  const flatMenu = ref<any[]>([])
  const transformMenuTree = (menuList: any[]) => {
    return menuList.forEach((item: any) => {
      if (item?.children?.length) {
        transformMenuTree(item.children)
      }
      flatMenu.value.push(item)
    })
  }

  // 获取用户菜单
  const menuList = ref<any[]>([])
  // 过滤菜单，去除不应在菜单栏中展示的菜单
  const filterMenu = (data: any) => {
    return data.filter((item: any) => item.is_in_menu).map((item2: any) => {
      return {
        ...item2,
        children: item2.children.length ? filterMenu(item2.children as any) : []
      }
    })
  }

  // 获取用户菜单
  const getUserMenu = async () => {
    try {
      const data = await getUserMenuAPI() 
      menuList.value = filterMenu(data)
      transformMenuTree(data)
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
