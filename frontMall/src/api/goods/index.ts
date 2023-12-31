import { request } from "@/utils/request";
import type { BaseListRequest } from "@/types/interface/BaseInterface"
import type { UpdateClassificationData, UpdateGoodsData } from "@/api/goods/types/index"

// 获取分类列表
export const getClassificationListAPI = (params: BaseListRequest) => {
  return request({
    url: '/api/classification/getGoodsClassificationList',
    method: 'get',
    params
  })
}

// 创建编辑分类
export const updateClassificationAPI = (data: UpdateClassificationData) => {
  return request({
    url: '/api/classification/updateGoodsClassification',
    method: 'post',
    data
  })
}

// 获取分类详情
export const getClassificationDetailAPI = (params: { classification_id: string | number }) => { 
  return request({
    url: '/api/classification/getGoodsClassificationDetail',
    method: 'get',
    params
  })
}

// 获取当前角色可选择的商品分类
export const getCurrentSalesCanSelectClassificationAPI = () => {
  return request({
    url: '/api/classification/getCurrentUserHasClassificationList',
    method: 'get'
  })
}

// 获取商品列表
export const getGoodsListAPI = (params: any) => {
  return request({
    url: "/api/goods/getGoodsList",
    method: "get",
    params
  })
}

// 更新商品上架状态
export const updateGoodsStatusAPI = (data: {
  goods_id: string | number,
  listing_status: boolean
}) => { 
  return request({
    url: "/api/goods/UpdateListingStatus",
    method: "post",
    data
  })
}

// 获取商品详情
export const getGoodsDetailAPI = (params: { goods_id: string | number }) => { 
  return request({
    url: "/api/goods/getGoodsDetail",
    method: "get",
    params
  })
}

// 更新商品信息
export const updateGoodsAPI = (data: UpdateGoodsData) => { 
  return request({
    url: "/api/goods/updateGoods",
    method: "post",
    data
  })
}

// 更新库存
export const updateInventoryAPI = (data: {
  goods_id: string | number,
  inventory: string | number
}) => { 
  return request({
    url: "/api/goods/updateInventory",
    method: "post",
    data
  })
}