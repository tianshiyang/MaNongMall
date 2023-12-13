const { Service } = require("egg")

class RoleService extends Service {
  /* 创建角色 - 同步角色表
   * @param {Object} - {role_name, role_sign, role_remark} 角色名称 角色标识 角色描述
   * @returns {Object} 创建信息
   */
  async createRole({ role_name, role_sign, role_remark }, transaction) {
    return await this.ctx.model.Role.create(
      {
        role_name,
        role_sign,
        role_remark,
      },
      {
        transaction,
      }
    )
  }

  /* 删除角色
   * @param {Object} - {role_id} 角色ID
   * @returns {Object} 删除信息
   */
  async deleteRole({ role_id }, transaction) {
    return await this.ctx.model.Role.destroy(
      {
        where: {
          id: role_id,
        },
      },
      {
        transaction,
      }
    )
  }

  /* 编辑角色
   * @param {Object} - {role_id, role_name, role_remark} 角色ID, 角色名称，角色描述
   * @returns {Object} 编辑信息
   */
  async updateRole({ role_id, role_name, role_remark }, transaction) {
    return await this.ctx.model.Role.update(
      {
        role_name,
        role_remark,
      },
      {
        where: {
          id: role_id,
        },
      },
      {
        transaction,
      }
    )
  }
}

module.exports = RoleService
