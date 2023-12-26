const BaseController = require("../globalController/BaseController")

class RoleGoodsClassificationController extends BaseController {
  // 更新、创建商品分类
  async updateGoodsClassification() {
    // 获取参数
    const params = this.ctx.request.body
    // 参数校验rules
    const rules = {
      classification_name: "string",
      classification_remark: "string",
      role_list: "string",
    }
    if (params.classification_id) {
      // 编辑
      rules.classification_id = "int"
    }
    // 校验参数
    const errors = await this.app.validator.validate(rules, params)
    if (errors) {
      // 如果Errors有值,则代表参数校验失败，调用自定义的error返回结果
      this.error({ error_message: `${errors[0].field}: ${errors[0].message}` })
      return
    }
    if (params.classification_id) {
      // 编辑
    } else {
      // 新增
      await this.compileHandleCreateClassification(params)
    }
  }

  // 新增分类
  async compileHandleCreateClassification(params) {
    let transaction = null
    try {
      // 开启事务
      transaction = await this.ctx.model.transaction()
      // 更新分类表
      const result =
        await this.ctx.service.goodsClassification.index.createGoodsClassification(
          params,
          transaction
        )
      const goods_classification_id = result.dataValues.id
      // 更新角色商品分类表
      const role_list = JSON.parse(params.role_list)
      const data = role_list.map((item) => {
        return {
          role_id: item,
          goods_classification_id,
        }
      })
      await this.ctx.service.roleGoodsClassification.index.createRoleGoodsClassification(
        data,
        transaction
      )
      // 提交事务
      await transaction.commit()
    } catch (error) {
      // 回滚事务
      await transaction.rollback()
      return this.error({
        error_message: error,
      })
    }
    await this.success({
      data: {
        message: "新增成功",
      },
    })
  }
}

module.exports = RoleGoodsClassificationController
