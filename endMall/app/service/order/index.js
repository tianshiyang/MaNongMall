const { Service } = require("egg")
const { Op } = require("sequelize")

class MenuRoleService extends Service {
  /* 创建订单
   * @param {Array} - {role_id, menu_id} 角色ID 菜单ID
   * @returns {Object} 创建信息
   */
  async createOrder(
    { seller_id, goods_id, profit, sales_num, transaction_volume },
    transaction
  ) {
    return await this.ctx.model.Orders.create(
      {
        seller_id,
        goods_id,
        profit,
        sales_num,
        transaction_volume,
      },
      {
        transaction,
      }
    )
  }

  /* 获取订单列表
   * @param {Array} - {seller_id, goods_id, classification_id, create_time, page_no, page_size} 用户id，商品名称，商品分类，创建时间，分页
   * @returns {Object} 创建信息
   */
  async getOrderList({
    seller_id,
    goods_id,
    classification_id,
    create_time,
    page_no = 1,
    page_size = 10,
  }) {
    const where = {}
    if (seller_id) {
      where.seller_id = seller_id
    }
    if (goods_id) {
      where.goods_id = goods_id
    }
    if (create_time) {
      const parseCreateTime = JSON.parse(create_time)
      where.create_time = {
        [Op.between]: [parseCreateTime[0], parseCreateTime[1]],
      }
    }
    const classification_where = {}
    if (classification_id) {
      classification_where.goods_classification = classification_id
    }
    return this.ctx.model.Orders.findAndCountAll({
      where,
      include: [
        {
          model: this.ctx.model.Goods,
          as: "goods_info",
          where: classification_where,
          include: [
            {
              model: this.ctx.model.GoodsClassification,
              as: "classification",
            },
          ],
        },
        {
          model: this.ctx.model.User,
          as: "user_info",
        },
      ],
      offset: (page_no - 1) * page_size,
      limit: Number(page_size),
      order: [["create_time", "DESC"]],
    })
  }
}

module.exports = MenuRoleService
