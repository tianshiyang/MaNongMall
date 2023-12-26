const BaseController = require("../globalController/BaseController")

class RoleGoodsClassificationController extends BaseController {
  // 更新、创建商品分类
  async updateGoods() {
    // 获取参数
    const params = this.ctx.request.body
    // 参数校验rules
    const rules = {
      goods_name: "string",
      goods_classification: "int",
      inventory: "string",
      purchase_price: "string",
      price: "string",
      listing_status: "string",
    }
    if (params.goods_id) {
      // 编辑
      rules.goods_id = "int"
    }
    // 校验参数
    const errors = await this.app.validator.validate(rules, params)
    if (errors) {
      // 如果Errors有值,则代表参数校验失败，调用自定义的error返回结果
      this.error({ error_message: `${errors[0].field}: ${errors[0].message}` })
      return
    }

    try {
      const result = await this.ctx.service.goods.index.createGoods(params)
      this.success({
        ...result.dataValues,
      })
    } catch (err) {
      this.error({ error_message: err.errors[0].message })
    }
  }
}

module.exports = RoleGoodsClassificationController
