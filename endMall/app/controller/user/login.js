const BaseController = require("../globalController/BaseController")

class HomeController extends BaseController {
  // 用户登录
  async login() {
    // Get请求，获取用户的账号和密码
    const rules = {
      account_number: "string",
      password: "string",
    }
    // 校验参数
    const errors = await this.app.validator.validate(rules, this.ctx.query)
    if (errors) {
      // 如果Errors有值,则代表参数校验失败，调用自定义的error返回结果
      this.error({ error_message: `${errors[0].field}: ${errors[0].message}` })
      return
    }
    // 调用service层做数据查询
    let result = null
    try {
      result = await this.ctx.service.user.login.fineUserInfo(this.ctx.query)
    } catch (e) {
      return this.error(e)
    }
    // 找不到用户的信息，或者用户被删除
    if (!result || result.is_delete) {
      return this.error({ error_message: "用户名或密码错误" })
    }
    // 判断用户是否离职
    if (result.is_depart) {
      return this.error({ error_message: "您已离职，请联系老板" })
    }
    // 返回用户的token
    const token = this.ctx.app.jwt.sign(
      {
        id: result.id,
        username: result.username,
        account_number: result.account_number,
      },
      this.ctx.app.config.jwt.secret
    )
    this.success({
      token,
    })
  }
}

module.exports = HomeController
