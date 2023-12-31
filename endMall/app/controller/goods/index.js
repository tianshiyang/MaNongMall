const GoodsClassificationController = require("../globalController/GoodsClassificationController")
const moment = require("moment")

class GoodsController extends GoodsClassificationController {
  // 更新、创建商品
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

    // 校验价格
    if (params.discount) {
      if (params.price * params.discount < params.purchase_price) {
        this.error({ error_message: "商品售价不能低于进价！" })
        return
      }
    }
    if (params.goods_id) {
      // 编辑
      const hasUpdateGoodsPermission = await this.hasPermission("UPDATE_GOODS")
      if (!hasUpdateGoodsPermission) {
        this.error({ error_message: "您没有编辑商品的权限！" })
        return
      }
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
      const hasCreateGoodsPermission = await this.hasPermission("CREATE_GOODS")
      if (!hasCreateGoodsPermission) {
        this.error({ error_message: "您没有创建商品的权限！" })
        return
      }
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
      // 获取当前人员所能售卖的分类列表
      const classificationList =
        await this.getCurrentSellerCanSellGoodsClassification()
      const classification_ids = classificationList.map(
        (item) => item.dataValues.id
      )
      if (!params.goods_classification) {
        params.goods_classification = classification_ids
      } else {
        params.goods_classification = [params.goods_classification]
      }
      result = await this.ctx.service.goods.index.getGoodsList(params)
      // 转化参数
      const list = result.rows.map((item) => {
        // 是否折扣中
        const is_discount = moment().isBetween(
          item.dataValues.discount_time_start,
          item.dataValues.discount_time_end
        )
        const current_price =
          is_discount && item.dataValues.discount
            ? item.dataValues.discount * item.dataValues.price
            : item.dataValues.price
        const data = {
          ...item.dataValues,
          is_discount,
          current_price,
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
    const hasUpdateInventoryPermission = await this.hasPermission(
      "UPDATE_INVENTORY"
    )
    if (!hasUpdateInventoryPermission) {
      this.error({ error_message: "没有更新库存的权限" })
      return
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
    const hasGoodsListingStatusPermission = await this.hasPermission(
      "GOODS_LISTING_STATUS"
    )
    if (!hasGoodsListingStatusPermission) {
      this.error({ error_message: "没有更新商品上下架的权限" })
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

  // 获取商品详情
  async getGoodsDetail() {
    // 获取参数
    const params = this.ctx.query
    // 参数校验rules
    const rules = {
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
      let data = await this.ctx.service.goods.index.getGoodsDetail(params)
      // 是否折扣中
      const is_discount = moment().isBetween(
        data.dataValues.discount_time_start,
        data.dataValues.discount_time_end
      )
      const current_price =
        is_discount && data.dataValues.discount
          ? data.dataValues.discount * data.dataValues.price
          : data.dataValues.price
      data = {
        ...data.dataValues,
        is_discount,
        current_price,
      }
      return this.success(data)
    } catch (e) {
      return this.error({ error_message: e.errors[0].message })
    }
  }

  // 获取当前角色所拥有的所有分类
  async getCurrentRoleAllClassification(userInfo) {
    // 获取当前用户所拥有的角色
    const role = await this.ctx.service.userRole.index.getUserRole(
      userInfo.user_id
    )
    const role_list = role.map((item) => item.role_info.id)
    // 获取每个角色所对应的所有分类
    const result =
      await this.ctx.service.roleGoodsClassification.index.getAllClassificationByRoleList(
        role_list
      )
    // 去重数据, 并且转化为前端所需要的数据
    const res = new Map()
    const data = result
      .filter(
        (item) =>
          !res.has(item.classification_info.dataValues.id) &&
          res.set(item.classification_info.dataValues.id, 1)
      )
      .map((item) => item.classification_info.id)
    return data
  }

  // // 获取当前角色所能售卖的所有商品
  // async getCurrentRoleAllGoods() {
  //   const userInfo = await this.getUserTokenVerify()
  //   try {
  //     // 获取当前角色所拥有的所有分类
  //     const data = await this.getCurrentRoleAllClassification(userInfo)
  //     const result =
  //       await this.ctx.service.goods.index.getAllGoodsByClassification(data)
  //     return this.success(result)
  //   } catch (e) {
  //     return this.error({ error_message: e.errors[0].message })
  //   }
  // }
}

module.exports = GoodsController
