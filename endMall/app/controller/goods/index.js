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

    if (params.goods_id) {
      // 编辑
      try {
        await this.editGoods(params)
        this.success({
          message: "编辑成功！",
        })
      } catch (err) {
        this.error({ error_message: err.errors[0].message })
      }
    } else {
      // 新增
      try {
        const result = await this.addGoods(params)
        this.success({
          ...result.dataValues,
        })
      } catch (err) {
        this.error({ error_message: err.errors[0].message })
      }
    }
  }

  // 新增商品
  async addGoods(params) {
    return await this.ctx.service.goods.index.createGoods(params)
  }

  // 编辑商品
  async editGoods(params) {
    return await this.ctx.service.goods.index.editGoods(params)
  }

  // 获取商品列表
  async getGoodsList() {
    const params = this.ctx.query
    let result = null
    try {
      result = await this.ctx.service.goods.index.getGoodsList(params)
      // 转化参数
      const list = result.rows.map((item) => {
        const data = {
          ...item.dataValues,
          goods_classification_name: item.classification.classification_name,
        }
        delete data.classification
        return data
      })
      this.success({
        list,
        total: result.count,
      })
    } catch (err) {
      this.error({ error_message: err.errors[0].message })
    }
  }

  // 更新库存
  async updateInventory() {
    // 获取参数
    const params = this.ctx.request.body
    // 参数校验rules
    const rules = {
      inventory: "string",
      goods_id: "int",
    }
    // 校验参数
    const errors = await this.app.validator.validate(rules, params)
    if (errors) {
      // 如果Errors有值,则代表参数校验失败，调用自定义的error返回结果
      this.error({ error_message: `${errors[0].field}: ${errors[0].message}` })
      return
    }
    if (params.inventory < 0) {
      return this.error({ error_message: "库存不能小于0" })
    }
    try {
      await this.ctx.service.goods.index.updateInventory(params)
      this.success({
        message: "更新库存成功",
      })
    } catch (err) {
      this.error({ error_message: err.errors[0].message })
    }
  }

  // 更新上架状态
  async UpdateListingStatus() {
    // 获取参数
    const params = this.ctx.request.body
    // 参数校验rules
    const rules = {
      listing_status: "boolean",
      goods_id: "int",
    }
    // 校验参数
    const errors = await this.app.validator.validate(rules, params)
    if (errors) {
      // 如果Errors有值,则代表参数校验失败，调用自定义的error返回结果
      this.error({ error_message: `${errors[0].field}: ${errors[0].message}` })
      return
    }
    try {
      await this.ctx.service.goods.index.updateListingStatus(params)
      this.success({
        message: "更新上架状态成功",
      })
    } catch (err) {
      this.error({ error_message: err.errors[0].message })
    }
  }
}

module.exports = RoleGoodsClassificationController
