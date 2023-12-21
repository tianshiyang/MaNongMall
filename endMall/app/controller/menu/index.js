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
      let result = null
      try {
        result = await this.editMenu(params)
      } catch (e) {
        return this.error({ error_message: e })
      }
      if (result[0] >= 1) {
        this.success({
          message: "编辑成功！",
        })
      } else {
        this.error({ message: "编辑失败！" })
      }
    } else {
      // 新增
      let result = null
      try {
        result = await this.createMenu(params)
      } catch (e) {
        return this.error({ error_message: e })
      }
      this.success({
        ...result,
        message: "创建成功！",
      })
    }
  }
  // 校验菜单创建、编辑规则
  async createOrUpdateMenuValidate(params) {
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
  }
  // 创建菜单
  async createMenu(params) {
    // 校验菜单创建、编辑规则
    try {
      await this.createOrUpdateMenuValidate(params)
    } catch (e) {
      return Promise.reject(e)
    }
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
    try {
      await this.createOrUpdateMenuValidate(params)
    } catch (e) {
      return Promise.reject(e)
    }
    let result = null
    try {
      result = await this.ctx.service.menu.index.editMenu(params)
    } catch (e) {
      return Promise.reject(e.errors[0].message)
    }
    // 返回编辑结果
    return result
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

  // 获取菜单列表
  async getMenuList() {
    // 获取参数
    const params = this.ctx.query
    let result = null
    try {
      result = await this.ctx.service.menu.index.getMenuList(params)
    } catch (e) {
      return this.error({ error_message: e.errors[0].message })
    }
    // 格式化，返回当前菜单父菜单的名称
    result.rows.forEach((res) => {
      res.dataValues.menu_parent_name = res.dataValues.parent
        ? res.dataValues.parent.menu_name
        : ""
      delete res.dataValues.parent
    })
    this.success({
      total: result.count,
      list: result.rows,
    })
  }

  // 获取菜单详情
  async getMenuDetail() {
    // 获取参数
    const params = this.ctx.query
    // 定义校验规则
    const rules = {
      menu_id: "int",
    }
    // 校验参数
    const errors = await this.app.validator.validate(rules, params)
    if (errors) {
      // 如果Errors有值,则代表参数校验失败，调用自定义的error返回结果
      this.error({ error_message: `${errors[0].field}: ${errors[0].message}` })
      return
    }
    let result = null
    try {
      result = await this.getMenuDetailById(params.menu_id)
    } catch (e) {
      return this.error({ error_message: e })
    }
    this.success({
      ...result.dataValues,
    })
  }

  // 获取菜单树形结构
  async getMenuTree() {
    let result = null
    try {
      result = await this.ctx.service.menu.index.getMenuTree()
    } catch (e) {
      return this.error({ error_message: e.errors[0].message })
    }
    return this.success({
      list: result,
    })
  }

  // 获取当前菜单关联的角色信息
  async checkCurrentPermissionRoleInfo(menu_id) {
    const relationRoleInfo =
      await this.ctx.service.menuRole.index.checkCurrentMenuRoleInfo(menu_id)
    if (relationRoleInfo.length) {
      // 去重参数
      const role_ids = [...new Set(relationRoleInfo.map((res) => res.role_id))]
      const bindRoleNames = await Promise.all(
        role_ids.map((item) =>
          (async () => {
            const result =
              await this.ctx.service.role.index.getRoleDetailInfoOnly(item)
            return result.dataValues.role_name
          })()
        )
      )
      return Promise.reject(bindRoleNames)
    }
    return Promise.resolve()
  }

  // 获取当前父级菜单下，所有子菜单的名称
  async getCurrentParentMenuChildrenName(menu_id) {
    return await this.ctx.service.menu.index.getRelationAllMenuById(menu_id)
  }

  // 删除菜单
  async deleteMenu() {
    // 获取参数
    const params = this.ctx.request.body
    // 定义校验规则
    const rules = {
      menu_id: "int",
    }
    // 校验参数
    const errors = await this.app.validator.validate(rules, params)
    if (errors) {
      // 如果Errors有值,则代表参数校验失败，调用自定义的error返回结果
      this.error({ error_message: `${errors[0].field}: ${errors[0].message}` })
      return
    }
    // 如果当前菜单关联了角色，则抛出错误
    try {
      await this.checkCurrentPermissionRoleInfo(params.menu_id)
    } catch (e) {
      return this.error({ error_message: `删除失败，当前菜单与${e + ""}关联` })
    }
    /**
     * 判断当前菜单为父菜单还是子菜单
     * - 子菜单
     *  - 结合上面的角色关联，如果没有关联角色，可删除
     * - 父菜单
     *  - 1. 结合上面的角色关联，如果没有关联角色，则依次执行如下逻辑
     *  - 2. 判断当前父菜单下有没有子菜单，如果有不可删除
     *  - 3. 如果没有子菜单，可以删除
     */
    let currentMenuInfo = null
    try {
      currentMenuInfo = await this.getMenuDetailById(params.menu_id)
    } catch (e) {
      return this.error({ error_message: e })
    }

    // 如果是父菜单
    if (!currentMenuInfo.menu_parent) {
      let result = null
      try {
        result = await this.getCurrentParentMenuChildrenName(currentMenuInfo.id)
      } catch (e) {
        return this.error(e)
      }
      if (result.length > 0) {
        // 当前父菜单下有子菜单
        return this.error({
          error_message: `当前菜单关联了子菜单【${
            result.map((res) => res.menu_name) + ""
          }】不可删除`,
        })
      }
    }

    // 删除菜单
    try {
      await this.ctx.service.menu.index.deleteMenuById(params.menu_id)
    } catch (e) {
      return this.error({
        error_message: e.errors[0].message,
      })
    }
    this.success({
      message: "删除成功",
    })
  }
}

module.exports = MenuController
