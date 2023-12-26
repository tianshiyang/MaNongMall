const { Service } = require("egg")

class RoleGoodsClassificationService extends Service {
  /* 创建角色和商品分类的绑定关系
   * @param {Array} - {role_id, classification_id} 角色id，商品分类id
   * @returns {Object} 创建信息
   */
  async createRoleGoodsClassification(data, transaction) {
    return await this.ctx.model.RoleGoodsClassification.bulkCreate(data, {
      transaction,
    })
  }

  /* 删除角色和商品分类的绑定关系
   * @param {Object} - {goods_classification_id} 商品分类的id
   * @returns {Object} 删除信息
   */
  async deleteRoleGoodsClassification(
    { goods_classification_id },
    transaction
  ) {
    return await this.ctx.model.RoleGoodsClassification.destroy({
      where: {
        goods_classification_id,
      },
      transaction,
    })
  }
}

module.exports = RoleGoodsClassificationService
