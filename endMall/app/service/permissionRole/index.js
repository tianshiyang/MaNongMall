const { Service } = require("egg")

class PermissionRoleService extends Service {
  /* 同步角色菜单表
   * @param {Array} - data {role_id, permission_id} 角色Id, 权限ID
   * @returns {Object} 创建信息
   */
  async createPermissionRole(data, transaction) {
    // 批量创建
    return await this.ctx.model.PermissionRole.bulkCreate(data, { transaction })
  }

  /* 删除角色绑定权限关系
   * @param {Object} - {role_id} 角色ID
   * @returns {Object} 删除信息
   */
  async deletePermissionRole({ role_id }, transaction) {
    return await this.ctx.model.PermissionRole.destroy({
      where: { role_id },
      transaction,
    })
  }

  /* 获取当前权限绑定的角色信息
   * @param {Object} - {role_id} 角色ID
   * @returns {Object} 删除信息
   */
  async checkCurrentPermissionRoleInfo(permission_id) {
    return await this.ctx.model.PermissionRole.findAll({
      where: { permission_id },
    })
  }

  // 获取当前角色的所有权限
  async getRolePermissions(role_id) {
    return await this.ctx.model.PermissionRole.findAll({
      where: { role_id },
    })
  }
}

module.exports = PermissionRoleService
