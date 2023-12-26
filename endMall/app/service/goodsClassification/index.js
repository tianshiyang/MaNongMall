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

  /* 编辑
   * @param {Object} - {classification_id, classification_name, classification_remark} 菜单唯一ID，菜单名称，菜单路径，父级菜单Id, 是否在菜单栏展示
   * @returns {Object} 菜单信息
   */
  async updateGoodsClassification({
    classification_name,
    classification_remark,
    classification_id,
  }) {
    const attribute = {
      classification_name,
      classification_remark,
    }
    return await this.ctx.model.GoodsClassification.update(attribute, {
      where: {
        id: classification_id,
      },
    })
  }

  // 获取分类列表
  async getGoodsClassificationList({ page_no = 1, page_size = 10 }) {
    return await this.ctx.model.GoodsClassification.findAndCountAll({
      include: [
        {
          model: this.ctx.model.RoleGoodsClassification,
          as: "role_list",
          include: [
            {
              model: this.ctx.model.Role,
              as: "role_info",
            },
          ],
        },
      ],
      offset: (page_no - 1) * page_size,
      limit: Number(page_size),
      order: [["create_time", "DESC"]],
      distinct: true,
    })
  }
}

module.exports = GoodsClassificationService