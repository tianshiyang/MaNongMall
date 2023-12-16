const { Service } = require("egg")

class LoginService extends Service {
  /* 查询用户信息
   * @param {Object} - {account_number, password}账号和密码
   * @returns {Object} 用户基本信息
   */
  async fineUserInfo({ account_number, password }) {
    return await this.ctx.model.User.findOne({
      where: {
        account_number,
        password,
      },
    })
  }
}

module.exports = LoginService
