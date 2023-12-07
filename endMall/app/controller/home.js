const BaseController = require("./globalController/BaseController")

class HomeController extends BaseController {
  async index() {
    this.error({ aa: "asdsad" })
  }

  async login() {
    const { ctx } = this
    console.log(this.ctx)
    const result = await ctx.model.User.create({
      username: "张三",
      phone: "12345678901",
      password: "123456",
      account_number: "zhangsan@qq.com",
      id_number: "130533199909999999",
    })
    const data = ctx.app.jwt.sign(
      {
        data: {
          name: "admin",
          result,
        },
      },
      ctx.app.config.jwt.secret
    )
    this.success({
      data,
    })
  }
}

module.exports = HomeController
