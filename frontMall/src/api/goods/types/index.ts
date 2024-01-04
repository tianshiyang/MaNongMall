// 更新商品分类
export interface UpdateClassificationData {
  classification_name: string
  classification_remark: string
  role_list: string
}

// 更新商品信息
export interface UpdateGoodsData {
  goods_id?: string | number
  goods_name: string
  goods_classification: number | string
  inventory: number | string
  purchase_price: number | string
  price: number | string
  discount: any
  discount_time_start: any
  discount_time_end: any
  listing_status: boolean
}