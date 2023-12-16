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

  /* 新增员工
   * @param {Object} - {username, password, phone, id_number, account_number, role} 用户名，密码，手机号，身份证号，账号，角色
   * @returns {Object} 用户基本信息
   */
  async addUser(
    { username, password, phone, id_number, account_number },
    transaction
  ) {
    return await this.ctx.model.User.create(
      {
        username,
        password,
        phone,
        id_number,
        account_number,
      },
      {
        transaction,
      }
    )
  }
}

module.exports = LoginService
