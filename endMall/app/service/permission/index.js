const { Service } = require("egg")

class PermissionService extends Service {
  /* 创建权限
   * @param {Object} - {permission_name, permission_sign, permission_remark} 权限名称 权限标识 权限描述
   * @returns {Object} 创建信息
   */
  async createPermission({
    permission_name,
    permission_sign,
    permission_remark,
  }) {
    return await this.ctx.model.Permission.create({
      permission_name,
      permission_sign,
      permission_remark,
    })
  }
}

module.exports = PermissionService
