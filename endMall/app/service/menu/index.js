const { Service } = require("egg")
const { Op } = require("sequelize")

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

  /* 获取菜单列表
   * @param {Object} - {
      menu_id,
      menu_name,
      menu_path,
      menu_parent = null,
      create_time,
      page_no = 1,
      page_size = 10,
    } 菜单唯一ID，菜单名称，菜单路径，父级菜单Id, 创建时间，分页
   * @returns {Object} 菜单信息
   */
  async getMenuList({
    menu_id,
    menu_name,
    menu_path,
    menu_parent = null,
    create_time,
    page_no = 1,
    page_size = 10,
  }) {
    const where = {}
    if (menu_id) {
      where.id = menu_id
    }
    if (menu_name) {
      // 模糊匹配菜单名称
      where.menu_name = {
        [Op.substring]: menu_name,
      }
    }
    if (menu_parent) {
      let currentParent = menu_parent
      if (Number(menu_parent) === -1) {
        currentParent = {
          [Op.is]: null,
        }
      }
      where.menu_parent = currentParent
    }
    if (menu_path) {
      where.menu_path = menu_path
    }
    if (create_time) {
      const parseCreateTime = JSON.parse(create_time)
      where.create_time = {
        [Op.between]: [parseCreateTime[0], parseCreateTime[1]],
      }
    }
    return await this.ctx.model.Menu.findAndCountAll({
      where,
      offset: (page_no - 1) * page_size,
      limit: page_size,
      order: [["create_time", "DESC"]],
    })
  }
}

module.exports = MenuService
