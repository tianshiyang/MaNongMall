import { request } from "@/utils/request";

// 获取订单列表
export const getOrderListAPI = (params: any) => {
  return request({
    url: '/api/order/getOrderList',
    method: 'get',
    params
  })
}
