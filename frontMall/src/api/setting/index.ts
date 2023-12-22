import { request } from "@/utils/request";
import type { getMenuListAPIParams, UpdateMenuData, GetPermissionListAPIParams } from "./types/index"
// 获取菜单列表
export const getMenuListAPI = (params: getMenuListAPIParams) => {
  return request({
    url: '/api/menu/getMenuList',
    method: 'get',
    params
  })
}

// 删除菜单
export const deleteMenuAPI = (data: { menu_id: number }) => {
  return request({
    url: '/api/menu/deleteMenu',
    method: 'post',
    data
  })
}

// 获取菜单详情
export const getMenuDetailAPI = (params: { menu_id: number | string }) => { 
  return request({
    url: '/api/menu/getMenuDetail',
    method: 'get',
    params
  })
}

// 更新、创建菜单
export const UpdateMenuAPI = (data: UpdateMenuData) => {
  return request({
    url: "/api/menu/updateMenu",
    method: "post",
    data
  })
}

// 获取权限列表
export const getPermissionListAPI = (params: GetPermissionListAPIParams) => {
  return request({
    url: '/api/permission/getPermissionList',
    method: 'get',
    params
  })
 }
