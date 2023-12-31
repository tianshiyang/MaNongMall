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
    return await this.ctx.model.MenuRole.destroy({
      where: { role_id },
      transaction,
    })
  }

  /* 获取当前菜单绑定的角色信息
   * @param {Object} - {menu_id} 菜单ID
   * @returns {Object} 删除信息
   */
  async checkCurrentMenuRoleInfo(menu_id) {
    return await this.ctx.model.MenuRole.findAll({
      where: { menu_id },
    })
  }

  /* 通过角色ID获取当前用户的所有菜单
   * @param {Object} - {role_id} 角色ID
   * @returns {Object} 菜单列表
   */
  async getUserAllMenuByRole({ role_id }) {
    return await this.ctx.model.MenuRole.findAll({
      where: { role_id },
    })
  }
}

module.exports = MenuRoleService
