const { Service } = require("egg")

class GoodsClassificationService extends Service {
  /* 创建分类 - 同步商品分类表
   * @param {Object} - {classification_name, classification_remark} 商品分类名称，商品分类描述
   * @returns {Object} 创建信息
   */
  async createGoodsClassification(
    { classification_name, classification_remark },
    transaction
  ) {
    return await this.ctx.model.GoodsClassification.create(
      { classification_name, classification_remark },
      {
        transaction,
      }
    )
  }
}

module.exports = GoodsClassificationService
