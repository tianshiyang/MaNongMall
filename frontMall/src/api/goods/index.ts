import { request } from "@/utils/request";
import type { BaseListRequest } from "@/types/interface/BaseInterface"
import type { UpdateClassificationData } from "@/api/goods/types/index"

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