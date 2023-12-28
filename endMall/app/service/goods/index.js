const { Service } = require("egg")
const { Op } = require("sequelize")

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

  /* 获取商品列表
   * @param {Object} - {goods_id, goods_name, goods_classification, has_inventory, is_in_discount_time, create_time, listing_status} 商品id，商品名称，商品分类，是否有库存，是否打折期内，创建时间，上架状态
   * @returns {Object} 编辑信息
   */
  getGoodsList({
    goods_id,
    goods_name,
    goods_classification,
    has_inventory,
    is_in_discount_time,
    create_time,
    listing_status,
    page_no = 1,
    page_size = 10,
  }) {
    const where = {}
    if (goods_id) {
      where.id = goods_id
    }
    if (goods_name) {
      where.goods_name = {
        [Op.substring]: goods_name,
      }
    }
    if (goods_classification) {
      where.goods_classification = goods_classification
    }
    if (is_in_discount_time) {
      // 是否打折期内
      where.discount_time_start = {
        [Op.lte]: new Date(),
      }
      where.discount_time_end = {
        [Op.gte]: new Date(),
      }
    }
    if (has_inventory !== null) {
      // 是否有库存
      where.inventory = {
        [Op.gt]: 0,
      }
    }
    if (listing_status) {
      where.listing_status = listing_status
    }
    if (create_time) {
      const parseCreateTime = JSON.parse(create_time)
      where.create_time = {
        [Op.between]: [parseCreateTime[0], parseCreateTime[1]],
      }
    }
    return this.ctx.model.Goods.findAndCountAll({
      include: [
        {
          model: this.ctx.model.GoodsClassification,
          as: "classification",
        },
      ],
      where,
      offset: (page_no - 1) * page_size,
      limit: Number(page_size),
      order: [["create_time", "DESC"]],
      distinct: true,
    })
  }

  /* 更新库存
   * @param {Object} - {goods_id, inventory} 商品id，库存数量
   * @returns {Object} 编辑信息
   */
  async updateInventory({ goods_id, inventory }) {
    const attribute = {
      inventory,
    }
    return await this.ctx.model.Goods.update(attribute, {
      where: {
        id: goods_id,
      },
    })
  }

  /* 通过售卖更新库存
   * @param {Object} - {goods_id, inventory} 商品id，库存数量
   * @returns {Object} 编辑信息
   */
  async updateInventoryAfterSales({ goods_id, inventory }, transaction) {
    return await this.ctx.model.Goods.update(
      {
        inventory,
      },
      {
        where: {
          id: goods_id,
        },
        transaction, // 踩坑-.-, update等操作回滚放第二个参数中，看官网
      }
    )
  }

  /* 更新上架状态
   * @param {Object} - {goods_id, inventory} 商品id，商品数量
   * @returns {Object} 编辑信息
   */
  async updateListingStatus({ goods_id, listing_status }) {
    const attribute = {
      listing_status,
    }
    return await this.ctx.model.Goods.update(attribute, {
      where: {
        id: goods_id,
      },
    })
  }

  /* 获取商品详情
   * @param {Object} - {goods_id} 商品id
   * @returns {Object} 商品详情
   */
  async getGoodsDetail({ goods_id }) {
    return await this.ctx.model.Goods.findOne({
      where: {
        id: goods_id,
      },
    })
  }

  // 获取该商品分类集合下的所有商品
  async getAllGoodsByClassification(classification_ids) {
    return this.ctx.model.Goods.findAll({
      where: {
        goods_classification: {
          [Op.or]: classification_ids,
        },
      },
    })
  }
}

module.exports = GoodsService
