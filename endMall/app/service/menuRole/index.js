const { Service } = require("egg")

class MenuRoleService extends Service {
  /* 同步角色菜单表
   * @param {Array} - {role_id, menu_id} 角色ID 菜单ID
   * @returns {Object} 创建信息
   */
  async createMenuRole(data, transaction) {
    // 批量创建
    return await this.ctx.model.MenuRole.bulkCreate(data, { transaction })
  }

  /* 删除角色绑定菜单关系
   * @param {Object} - {role_id} 角色ID
   * @returns {Object} 删除信息
   */
  async deleteMenuRole({ role_id }, transaction) {
    return await this.ctx.model.MenuRole.destroy(
      { where: { role_id } },
      { transaction }
    )
  }
}

module.exports = MenuRoleService
