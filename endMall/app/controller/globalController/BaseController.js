const { Controller } = require("egg")

class BaseController extends Controller {
  // 定义成功的返回格式
  success(data) {
    this.ctx.status = 200
    this.ctx.body = {
      data,
      isSuccess: true,
    }
  }

  /**
   * 定义失败的返回格式
   * @param {Object} errorData 处理错误的返回数据，包装到response中的data返回
   */
  error(errorData = {}) {
    this.ctx.status = 200
    this.ctx.body = {
      data: {
        errorMessage: "执行失败",
        ...errorData,
      },
      isSuccess: false,
    }
  }

  // 没有权限、登录失败等认证失败
  noAuthority(data = {}) {
    this.error(data)
  }
}

module.exports = BaseController
