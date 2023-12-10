const { Service } = require("egg")

class MenuService extends Service {
  /* 通过menu_id获取权限
   * @param {Object} - {menu_id} 菜单唯一信息
   * @returns {Object} 菜单信息
   */
  async getMenuDetailById(menu_id) {
    return await this.ctx.model.Menu.findOne({
      where: {
        id: menu_id,
      },
    })
  }

  /* 创建菜单
   * @param {Object} - {menu_name, menu_path, menu_parent = null} 菜单名称，菜单路径，父级菜单Id
   * @returns {Object} 菜单信息
   */
  async createMenu({ menu_name, menu_path, menu_parent }) {
    const where = {
      menu_name,
      menu_path,
    }
    if (menu_parent) {
      where.menu_parent = menu_parent
    }
    return await this.ctx.model.Menu.create(where)
  }

  /* 编辑
   * @param {Object} - {menu_id, menu_name, menu_path, menu_parent = null} 菜单唯一ID，菜单名称，菜单路径，父级菜单Id
   * @returns {Object} 菜单信息
   */
  async editMenu({ menu_id, menu_name, menu_path, menu_parent }) {
    const attribute = { menu_name, menu_path }
    if (menu_parent) {
      attribute.menu_parent = menu_parent
    }
    return await this.ctx.model.Menu.update(attribute, {
      where: {
        id: menu_id,
      },
    })
  }
}

module.exports = MenuService
