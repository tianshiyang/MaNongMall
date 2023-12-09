const { Service } = require("egg")

class BillService extends Service {
  /* 查询用户信息
   * @param {Object} - {account_number, password}账号和密码
   * @returns {Object} 用户基本信息
   */
  async fineUserInfo({ account_number, password }) {
    let result = null
    try {
      result = await this.ctx.model.User.findOne({
        where: {
          account_number,
          password,
        },
      })
    } catch (e) {
      throw Error(e)
    }
    return result
  }
}

module.exports = BillService
