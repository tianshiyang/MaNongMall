import { request } from "@/utils/request";
import type { getMenuListAPIParams, UpdateMenuData } from "./types/index"

// 用户登录
export const userLoginAPI = (params: { account_number: string, password: string }) => {
  return request({
    url: '/api/user/login',
    method: 'get',
    params: params
  })
}

// 获取用户菜单
export const getUserMenuAPI = () => {
  return request({
    url: '/api/user/getUserMenu',
    method: 'get'
  })
}

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
