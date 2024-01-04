const BaseController = require("../globalController/BaseController")
const moment = require("moment")

class OrderController extends BaseController {
  // 获取当前商品详情
  async getGoodsDetail({ goods_id }) {
    return await this.ctx.service.goods.index.getGoodsDetail({ goods_id })
  }
  // 创建订单公共方法
  async createOrderPublicFn(
    { profit, goods_id, sales_num, seller_id, transaction_volume },
    transaction
  ) {
    return await this.ctx.service.order.index.createOrder(
      {
        profit,
        goods_id,
        sales_num,
        seller_id,
        transaction_volume,
      },
      transaction
    )
  }
  // 更新库存公共方法
  async updateInventoryPublicFn({ goods_id, inventory }, transaction) {
    return await this.ctx.service.goods.index.updateInventory(
      {
        goods_id,
        inventory,
      },
      transaction
    )
  }
  // 创建订单
  async createOrder() {
    // 获取参数
    const params = this.ctx.request.body
    // 参数校验rules
    const rules = {
      goods_id: "string",
      sales_num: "int",
    }
    // 校验参数
    const errors = await this.app.validator.validate(rules, params)
    if (errors) {
      // 如果Errors有值,则代表参数校验失败，调用自定义的error返回结果
      this.error({ error_message: `${errors[0].field}: ${errors[0].message}` })
      return
    }
    // 事务
    let transaction = null
    try {
      const goodsDetail = await this.getGoodsDetail(params)
      const {
        inventory,
        discount,
        price,
        purchase_price,
        discount_time_start,
        discount_time_end,
      } = goodsDetail

      // 判断库存
      if (params.sales_num > inventory) {
        this.error({ error_message: "库存不足, 请联系老板" })
        return
      }

      // 是否折扣中
      const is_discount = moment().isBetween(
        discount_time_start,
        discount_time_end
      )
      // 现价
      const current_price = is_discount && discount ? discount * price : price
      // 利润 = 销售数量 * （进价 - 现价）
      const profit = Number(
        params.sales_num * (current_price - purchase_price)
      ).toFixed(2)
      // 获取当前销售的id
      const { user_id } = await this.getUserTokenVerify()
      // 开启事务
      transaction = await this.ctx.model.transaction()
      // 卖出后的库存
      const inventory_after_sale = inventory - params.sales_num
      // 成交额
      const transaction_volume = Number(
        params.sales_num * current_price
      ).toFixed(2)
      // 更新库存
      await this.updateInventoryPublicFn(
        { goods_id: params.goods_id, inventory: inventory_after_sale },
        transaction
      )
      // 创建订单
      await this.createOrderPublicFn(
        {
          transaction_volume,
          profit,
          ...params,
          seller_id: user_id,
        },
        transaction
      )

      // 提交事务
      await transaction.commit()
    } catch (e) {
      // 回滚事务
      await transaction.rollback()
      return this.error({ error_message: e.errors[0].message })
    }
    this.success({
      message: "下单成功",
    })
  }

  // 获取订单列表
  async getOrderList() {
    const params = this.ctx.query
    const { user_id } = await this.getUserTokenVerify()

    // 判断当前用户是不是admin，如果是不是admin，则强制将params的seller_id，变成当前角色的id，已此实现数据的角色过滤需求
    const is_admin = await this.hasRole("SUPPER_ADMIN")
    if (!is_admin) {
      params.seller_id = user_id
    }
    try {
      const result = await this.ctx.service.order.index.getOrderList(params)
      const list = result.rows.map((item) => {
        const result = {
          ...item.dataValues,
          goods_name: item.dataValues.goods_info.dataValues.goods_name,
          classification_name:
            item.dataValues.goods_info.dataValues.classification.dataValues
              .classification_name,
          classification_id:
            item.dataValues.goods_info.dataValues.classification.dataValues.id,
          seller_id: item.dataValues.user_info.dataValues.id,
          seller_name: item.dataValues.user_info.dataValues.username,
        }
        delete result.goods_info
        delete result.user_info
        return result
      })
      return this.success({ list, total: result.count })
    } catch (e) {
      console.log(e)
      return this.error({ error_message: e.errors[0].message })
    }
  }

  // 查询当前商品的售卖统计数据
  async getSalesDataStatistics() {
    // 获取参数
    const params = this.ctx.query
    // 参数校验rules
    const rules = {
      goods_id: "string",
    }
    // 校验参数
    const errors = await this.app.validator.validate(rules, params)
    if (errors) {
      // 如果Errors有值,则代表参数校验失败，调用自定义的error返回结果
      this.error({ error_message: `${errors[0].field}: ${errors[0].message}` })
      return
    }

    try {
      // 判断当前用户是不是admin，如果是不是admin,则只能查看自己的售卖数据，如果是则查看所有的
      const is_admin = await this.hasRole("SUPPER_ADMIN")
      params.is_admin = is_admin
      // 获取当前用户id
      const { user_id } = await this.getUserTokenVerify()
      params.seller_id = user_id
      const result = await this.ctx.service.order.index.getSalesDataStatistics(
        params
      )
      const data = result.map((item) => {
        const currentResult = {
          ...item.dataValues,
          username: item.dataValues?.user_info.dataValues.username,
        }
        delete currentResult.user_info
        return currentResult
      })
      return this.success(data)
    } catch (e) {
      return this.error({ error_message: e.errors[0].message })
    }
  }
}

module.exports = OrderController
