const { Service } = require("egg")

class UserRoleService extends Service {
  /* 同步员工角色表
   * @param {Array} - data {user_id, role_id} 用户ID, 角色ID
   * @returns {Object} 创建信息
   */
  async createUserRole(data, transaction) {
    // 批量创建
    return await this.ctx.model.UserRole.bulkCreate(data, { transaction })
  }
  /* 删除当前用户关联的角色
   * @param {Array} - data {user_id, role_id} 用户ID, 角色ID
   * @returns {Object} 创建信息
   */
  async deleteUserRelationRole(user_id, transaction) {
    return await this.ctx.model.UserRole.destroy({
      where: {
        user_id,
      },
      transaction,
    })
  }

  /* 获取当前用户的角色
   * @param {int} - {user_id} 用户ID
   * @returns {Object} 角色列表
   */
  async getUserRole(user_id) {
    return this.ctx.model.UserRole.findAll({
      where: {
        user_id,
      },
      include: [
        {
          model: this.ctx.model.Role,
          as: "role_info",
        },
      ],
    })
  }

  /* 获取当前用户的角色, 不进行子查询，获取当前角色的详情信息
   * @param {int} - {user_id} 用户ID
   * @returns {Object} 角色列表
   */
  async getUserOnlyRole(user_id) {
    return this.ctx.model.UserRole.findAll({
      where: {
        user_id,
      },
    })
  }
}

module.exports = UserRoleService
