const BaseController = require("../globalController/BaseController")

class MenuController extends BaseController {
  // 更新创建菜单
  async updateMenu() {
    // 获取参数
    const params = this.ctx.request.body
    // 参数校验rules
    const rules = {
      menu_name: "string",
      menu_path: "string",
    }
    if (params.menu_id) {
      // 编辑
      rules.menu_id = "int"
    }
    // 校验参数
    const errors = await this.app.validator.validate(rules, params)
    if (errors) {
      // 如果Errors有值,则代表参数校验失败，调用自定义的error返回结果
      this.error({ error_message: `${errors[0].field}: ${errors[0].message}` })
      return
    }
    if (params.menu_id) {
      // 编辑
    } else {
      // 新增
      let result = null
      try {
        result = await this.createMenu(params)
      } catch (e) {
        return this.error({ error_message: e })
      }
      this.success({
        ...result.dataValues,
        message: "创建成功！",
      })
    }
  }
  // 创建菜单
  async createMenu(params) {
    if (params.menu_parent) {
      // 如果填写了menu_parent，需要判断当前父级菜单是否存在，并且此父级菜单是顶级菜单，即父级菜单的menu_parent为空
      let currentMenuDetail = null
      try {
        currentMenuDetail = await this.getMenuDetailById(params.menu_parent)
      } catch (e) {
        return Promise.reject(e)
      }
      if (currentMenuDetail.dataValues.menu_parent) {
        return Promise.reject("父级菜单必须是顶级菜单！")
      }
    }
    // 创建
    let result = null
    try {
      result = await this.ctx.service.menu.index.createMenu(params)
    } catch (e) {
      return Promise.reject(e.errors[0].message)
    }
    // 返回创建完成的权限信息
    return result.dataValues
  }
  // 编辑菜单
  async editMenu(params) {
    console.log(params)
  }

  /* 通过菜单ID获取菜单详情
   * @param {Object} - {menu_id} 菜单唯一信息
   * @returns {Object} 菜单信息
   */
  async getMenuDetailById(menu_id) {
    let result = null
    try {
      result = await this.ctx.service.menu.index.getMenuDetailById(menu_id)
    } catch (e) {
      return Promise.reject(e.errors[0].message)
    }
    if (!result || !result.dataValues) {
      return Promise.reject("当前选择的菜单不存在")
    }
    return result
  }
}

module.exports = MenuController
