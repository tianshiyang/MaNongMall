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

// 权限列表查询接口
export interface GetPermissionListAPIParams extends BaseListRequest {
  permission_name?: string
  permission_id?: string | number
}

// 更新权限
export interface UpdatePermissionData { 
  permission_id?: number | string
  permission_name: string
  permission_sign: string
  permission_remark: string
}

// 获取角色列表
export interface GetRoleListAPIParams extends BaseListRequest { 
  role_name?: string
  role_id?: string | number
  role_sign?: string
  create_time?: string | null
}

// 编辑角色
export interface UpdateRoleData { 
  role_id?: string | number
  role_name: string
  role_sign: string
  role_remark: string
  menu_list: string
  permission_list: string
}

// 用户列表查询参数
export interface GetUserListAPIParams extends BaseListRequest { 
  role_id?: string | number
  user_id?: string | number
  phone?: string
  create_time?: string | null
  is_depart?: number | string
}

// 创建员工
export interface CreateUserData { 
  username: string
  phone: string
  id_number: string
  password: string
  account_number: string
  role_list: string
}

// 更新员工信息
export interface EditUserInfoData {
  username: string
  phone: string
  id_number: string
}