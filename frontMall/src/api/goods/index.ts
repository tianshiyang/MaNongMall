import { request } from "@/utils/request";

// 获取分类列表
export const getClassificationListAPI = () => {
  return request({
    url: '/api/classification/getGoodsClassificationList',
    method: 'get',
  })
}
