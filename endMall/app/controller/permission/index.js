const BaseController = require("../globalController/BaseController")

class PermissionController extends BaseController {
  // 编辑、创建权限
  async updatePermission() {
    // Post请求，通过this.ctx.request.body获取参数
    // 获取参数
    const params = this.ctx.request.body
    // 定义校验规则
    const rules = {
      permission_name: "string",
      permission_remark: "string",
    }
    if (!params.permission_id) {
      // 创建 -> 需要校验权限标识
      rules.permission_sign = "string"
    } else {
      // 编辑 -> 需要校验权限唯一ID
      rules.permission_id = "int"
    }
    // 校验参数
    const errors = await this.app.validator.validate(rules, params)
    if (errors) {
      // 如果Errors有值,则代表参数校验失败，调用自定义的error返回结果
      this.error({ error_message: `${errors[0].field}: ${errors[0].message}` })
      return
    }

    if (params.permission_id) {
      // 编辑
      let result = null
      try {
        result = await this.ctx.service.permission.index.updatePermission(
          params
        )
      } catch (e) {
        return this.error({ error_message: e.errors[0].message })
      }
      if (result[0] === 0) {
        // 编辑的时候，可能因为ID不存在，所以没有数据被更改
        return this.error({ error_message: "没有此条权限" })
      }
      this.success({
        message: "操作成功！",
      })
    } else {
      // 新增
      let result = null
      try {
        result = await this.ctx.service.permission.index.createPermission(
          params
        )
      } catch (e) {
        return this.error({ error_message: e.errors[0].message })
      }
      // 返回创建完成的权限信息
      this.success({
        ...result.dataValues,
        message: "创建成功！",
      })
    }
  }
}

module.exports = PermissionController
