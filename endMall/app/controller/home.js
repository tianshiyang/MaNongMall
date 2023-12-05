const BaseController = require("./globalController/BaseController")

class HomeController extends BaseController {
  async index() {
    this.error({ aa: "asdsad" })
  }

  async login() {
    const { ctx } = this
    const data = ctx.app.jwt.sign(
      {
        data: {
          name: "admin",
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
