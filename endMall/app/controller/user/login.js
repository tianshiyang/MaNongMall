const BaseController = require("../globalController/BaseController")

class HomeController extends BaseController {
  // 用户登录
  async login() {
    // Get请求，获取用户的账号和密码
    const { accountNumber, password } = this.ctx.query
    const rules = {
      accountNumber: "string",
      password: "string",
    }
    // 校验参数
    const errors = await this.app.validator.validate(rules, this.ctx.query)
    if (errors) {
      // 如果Errors有值,则代表参数校验失败，调用自定义的error返回结果
      this.error({ errorMessage: `${errors[0].field}: ${errors[0].message}` })
      return
    }
    console.log(errors)
    console.log(accountNumber, password)
    this.success({
      data: {
        message: "123",
      },
    })
  }
}

module.exports = HomeController
