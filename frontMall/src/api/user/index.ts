import { request } from "@/utils/request";

// 用户登录
export const userLogin = (params: { account_number: string, password: string }) => {
  return request({
    url: '/api/user/login',
    method: 'get',
    params: params
  })
}