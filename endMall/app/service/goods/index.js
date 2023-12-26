const { Service } = require("egg")

class GoodsService extends Service {
  /* 创建商品
   * @param {Object} - {goods_name, goods_classification, inventory, purchase_price, price, discount, discount_time, listing_status} 商品名称，商品分类，库存，进价，售价，折扣，折扣时间，上架状态
   * @returns {Object} 创建信息
   */
  async createGoods({
    goods_name,
    goods_classification,
    inventory,
    purchase_price,
    price,
    discount = 1,
    discount_time_start,
    discount_time_end,
    listing_status = true,
  }) {
    return await this.ctx.model.Goods.create({
      goods_name,
      goods_classification,
      inventory,
      purchase_price,
      price,
      discount,
      discount_time_start,
      discount_time_end,
      listing_status,
    })
  }
  /* 编辑商品
   * @param {Object} - {goods_id, goods_name, goods_classification, inventory, purchase_price, price, discount, discount_time_start, discount_time_end, listing_status} 商品名称，商品分类，库存，进价，售价，折扣，折扣时间，上架状态
   * @returns {Object} 编辑信息
   */
  async editGoods({
    goods_id,
    goods_name,
    goods_classification,
    inventory,
    purchase_price,
    price,
    discount,
    discount_time_start,
    discount_time_end,
    listing_status,
  }) {
    const attribute = {
      goods_name,
      goods_classification,
      inventory,
      purchase_price,
      price,
      discount,
      discount_time_start,
      discount_time_end,
      listing_status,
    }
    return await this.ctx.model.Goods.update(attribute, {
      where: {
        id: goods_id,
      },
    })
  }
}

module.exports = GoodsService
