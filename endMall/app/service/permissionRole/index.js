const { Service } = require("egg")

class PermissionRoleService extends Service {
  /* 同步角色菜单表
   * @param {Array} - data {role_id, permission_id} 角色Id, 权限ID
   * @returns {Object} 创建信息
   */
  async createPermissionRole(data) {
    // 批量创建
    return await this.ctx.model.PermissionRole.bulkCreate(data)
  }
}

module.exports = PermissionRoleService
