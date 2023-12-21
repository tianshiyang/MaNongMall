import { request } from "@/utils/request";
import type { getMenuListAPIParams } from "./types/index"

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