const { Service } = require("egg")

class BillService extends Service {
  /* 查询用户信息
   * @param {Object} - {accountNumber, password}账号和密码
   * @returns {Object} 用户基本信息
   */
  async fineUserInfo({ accountNumber, password }) {
    let result = null
    try {
      result = await this.ctx.model.User.findOne({
        where: {
          account_number: accountNumber,
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
