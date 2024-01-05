import { request } from "@/utils/request";

// 获取订单列表
export const getOrderListAPI = (params: any) => {
  return request({
    url: '/api/order/getOrderList',
    method: 'get',
    params
  })
}

// 新增订单
export const addGoodsAPI = (data: {sales_num: string, goods_id: string}) => {
  return request({
    url: '/api/order/createOrder',
    method: 'post',
    data
  })
}
