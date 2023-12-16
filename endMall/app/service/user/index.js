const { Service } = require("egg")

class LoginService extends Service {
  /* 查询用户信息
   * @param {Object} - {user_id, account_number, password}账号和密码
   * @returns {Object} 用户基本信息
   */
  async fineUserInfo({ user_id, account_number, password }) {
    const where = {}
    if (user_id) {
      // 用id查询
      where.id = user_id
    }
    if (account_number && password) {
      // 用账号和密码查询
      where.account_number = account_number
      where.password = password
    }
    return await this.ctx.model.User.findOne({
      where,
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

  /* 更新员工信息
   * @param {Object} - {username, phone, id_number} 用户名，手机号，身份证号
   * @returns {Object} 更新信息
   */
  async updateUser({ user_id, username, phone, id_number }) {
    await this.ctx.model.User.update(
      {
        username,
        phone,
        id_number,
      },
      {
        where: {
          id: user_id,
        },
      }
    )
  }

  /* 更新员工离职
   * @param {Object} - {user_id} 用户ID
   * @returns {Object} 更新信息
   */
  async makeUserDepart({ user_id }) {
    return this.ctx.model.User.update(
      {
        is_depart: true,
      },
      {
        where: {
          id: user_id,
        },
      }
    )
  }
}

module.exports = LoginService
