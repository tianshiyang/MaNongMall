const BaseController = require("../globalController/BaseController")

class PermissionController extends BaseController {
  // 编辑、创建权限
  async updatePermission() {
    // Post请求，通过this.ctx.request.body获取参数
    // 定义校验规则
    const rules = {
      permission_name: "string",
      permission_sign: "string",
      permission_remark: "string",
    }
    // 校验参数
    const errors = await this.app.validator.validate(
      rules,
      this.ctx.request.body
    )
    if (errors) {
      // 如果Errors有值,则代表参数校验失败，调用自定义的error返回结果
      this.error({ error_message: `${errors[0].field}: ${errors[0].message}` })
      return
    }
  }
}

module.exports = PermissionController
