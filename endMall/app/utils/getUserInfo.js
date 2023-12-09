// 获取用户信息
const getUserInfo = async (_that) => {
  const decode = await _that.app.jwt.verify(
    _that.ctx.request.header.authorization,
    _that.app.config.jwt.secret
  )
  return decode
}

module.exports = {
  getUserInfo,
}
