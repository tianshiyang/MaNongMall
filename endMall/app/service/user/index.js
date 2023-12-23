const { Service } = require("egg")
const { Op } = require("sequelize")

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
      include: [
        {
          model: this.ctx.model.UserRole,
          as: "role_list",
        },
      ],
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

  /* 更新员工密码
   * @param {Object} - {user_id, password} 用户ID, 用户密码
   * @returns {Object} 更新信息
   */
  async updateUserPassword({ user_id, password }) {
    return await this.ctx.model.User.update(
      {
        password,
      },
      {
        where: {
          id: user_id,
        },
      }
    )
  }

  // 获取人员列表
  async getUserList({
    username,
    user_id,
    phone,
    role_id,
    is_depart = 0,
    create_time,
    page_no = 1,
    page_size = 20,
  }) {
    const where = {}
    if (user_id) {
      where.id = user_id
    }
    if (username) {
      where.username = {
        [Op.substring]: username,
      }
    }
    if (phone) {
      where.phone = {
        [Op.substring]: phone,
      }
    }
    if (is_depart) {
      where.is_depart = is_depart
    }
    if (create_time) {
      const parseCreateTime = JSON.parse(create_time)
      where.create_time = {
        [Op.between]: [parseCreateTime[0], parseCreateTime[1]],
      }
    }
    const subWhere = {}
    if (role_id) {
      subWhere.role_id = role_id
    }
    return await this.ctx.model.User.findAndCountAll({
      where,
      include: [
        {
          model: this.ctx.model.UserRole,
          as: "role_list",
          where: subWhere,
          include: [
            {
              model: this.ctx.model.Role,
              as: "role_info",
            },
          ],
        },
      ],
      offset: (page_no - 1) * page_size,
      limit: Number(page_size),
      order: [["create_time", "DESC"]],
      distinct: true,
    })
  }
}

module.exports = LoginService
