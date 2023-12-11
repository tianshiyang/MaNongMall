const { Service } = require("egg")

class MenuRoleService extends Service {
  /* 同步角色菜单表
   * @param {Array} - {role_id, menu_id} 角色ID 菜单ID
   * @returns {Object} 创建信息
   */
  async createMenuRole(data, transaction) {
    console.log(data)
    // 批量创建
    return await this.ctx.model.MenuRole.bulkCreate(data, { transaction })
  }
}

module.exports = MenuRoleService
