const { Service } = require("egg")

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
}

module.exports = MenuRoleService
