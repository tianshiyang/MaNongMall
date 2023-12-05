module.exports = () => {
  return async function (ctx, next) {
    const token = ctx.request.header.authorization
    if (token) {
      try {
        // 解码token
        ctx.app.jwt.verify(token, ctx.app.jwt.secret)
        await next()
      } catch (error) {
        let errorMessage = "认证失败"
        if (error.name === "TokenExpiredError") {
          errorMessage = "登录过期, 请重新登录"
        }
        ctx.status = 401
        ctx.body = {
          message: errorMessage,
        }
        return
      }
    } else {
      ctx.status = 401
      ctx.body = {
        message: "您当前没有登录，请去登录",
      }
      return
    }
  }
}
