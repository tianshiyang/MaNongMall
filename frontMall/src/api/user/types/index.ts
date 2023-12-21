import type { BaseListRequest } from "@/types/interface/BaseInterface"

// 菜单列表查询接口
export interface getMenuListAPIParams extends BaseListRequest {
  menu_name?: string
  menu_parent?: number | string
  menu_path?: string
  create_time?: string | null
}

// 更新菜单
export interface UpdateMenuData {
  menu_id?: number | string
  menu_name: string
  menu_parent: number | string
  menu_path: string
}