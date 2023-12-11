const { Service } = require("egg")

class RoleService extends Service {
  /* 创建角色 - 同步角色表
   * @param {Object} - {role_name, role_sign, role_remark} 角色名称 角色标识 角色描述
   * @returns {Object} 创建信息
   */
  async createRole({ role_name, role_sign, role_remark }) {
    return await this.ctx.model.Role.create({
      role_name,
      role_sign,
      role_remark,
    })
  }
}

module.exports = RoleService
