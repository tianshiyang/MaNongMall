const { Controller } = require("egg")

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    ctx.body = {
      data: {
        msg: "nihao",
      },
      isSuccess: true,
    }
  }
}

module.exports = HomeController
