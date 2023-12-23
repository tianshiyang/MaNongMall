import { request } from "@/utils/request";
import type {
  getMenuListAPIParams,
  UpdateMenuData,
  GetPermissionListAPIParams,
  UpdatePermissionData,
  GetRoleListAPIParams,
  UpdateRoleData,
  GetUserListAPIParams,
  CreateUserData
} from "./types/index"
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

// 删除权限
export const deletePermissionAPI = (data: { permission_id: number }) => {
  return request({
    url: '/api/permission/deletePermission',
    method: 'post',
    data
  })
}

// 获取权限详情
export const getPermissionDetailAPI = (params: { permission_id: number | string }) => {
  return request({
    url: '/api/permission/getPermissionDetail',
    method: 'get',
    params
  })
}

// 更新、编辑权限
export const updatePermissionAPI = (data: UpdatePermissionData) => { 
  return request({
    url: '/api/permission/updatePermission',
    method: 'post',
    data
  })
}

// 获取角色列表
export const getRoleListAPI = (params: GetRoleListAPIParams) => {
  return request({
    url: '/api/role/getRoleList',
    method: 'get',
    params
  })
}

// 删除角色
export const deleteRoleAPI = (data: { role_id: number | string }) => {
  return request({
    url: "/api/role/deleteRole",
    method: "post",
    data
  })
}

// 获取角色详情
export const getRoleDetailAPI = (params: { role_id: number | string }) => {
  return request({
    url: "/api/role/getRoleDetail",
    method: "get",
    params
  })
}

// 获取菜单树形结构
export const getMenuTreeAPI = () => {
  return request({
    url: "/api/menu/getMenuTree",
    method: "get"
  })
}

// 更改角色
export const updateRoleAPI = (data: UpdateRoleData) => {
  return request({
    url: "/api/role/updateRole",
    method: "post",
    data
  })
}

// 获取用户列表
export const getUserListAPI = (params: GetUserListAPIParams) => { 
  return request({
    url: "/api/user/getUserList",
    method: "get",
    params
  })
}

// 创建员工
export const createUserAPI = (data: CreateUserData) => { 
  return request({
    url: "/api/user/addUser",
    method: "post",
    data
  })
}

// 员工离职
export const userDepartAPI = (data: { user_id: number }) => { 
  return request({
    url: "/api/user/makeUserDepart",
    method: "post",
    data
  })
}