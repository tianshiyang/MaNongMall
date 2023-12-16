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
}

module.exports = UserRoleService
