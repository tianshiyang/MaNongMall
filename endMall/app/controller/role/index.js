const BaseController = require("../globalController/BaseController")
class RoleController extends BaseController {
  // 编辑、创建权限
  async updateRole() {
    // Post请求，通过this.ctx.request.body获取参数
    const params = this.ctx.request.body
    // 转化参数
    params.menu_list = JSON.parse(params.menu_list)
    params.permission_list = JSON.parse(params.permission_list)
    // 定义校验规则
    const rules = {
      role_name: "string",
      role_remark: "string",
      menu_list: {
        type: "array",
        allowEmpty: true,
      },
      permission_list: {
        type: "array",
        allowEmpty: true,
      },
    }
    if (!params.role_id) {
      // 创建 -> 需要校验权限标识
      rules.role_sign = "string"
    } else {
      // 编辑 -> 需要校验权限唯一ID
      rules.role_id = "int"
    }
    // 校验参数
    const errors = await this.app.validator.validate(rules, params)
    if (errors) {
      // 如果Errors有值,则代表参数校验失败，调用自定义的error返回结果
      this.error({ error_message: `${errors[0].field}: ${errors[0].message}` })
      return
    }
    if (params.role_id) {
      // 编辑
      await this.compileHandleUpdateRole(params)
    } else {
      // 创建
      await this.compileHandleCreateRole(params)
    }
  }

  // 处理编辑场景
  async compileHandleUpdateRole(params) {
    // 编辑场景
    let result = null
    // 开启事务
    let transaction = null
    try {
      // 开启事务
      transaction = await this.ctx.model.transaction()
      result = await this.updateRolePublicFn(params, transaction)
      // 提交事务
      await transaction.commit()
    } catch (error) {
      // 回滚事务
      await transaction.rollback()
      return this.error({
        error_message: error,
      })
    }
    this.success({
      result,
    })
  }

  // 处理新增场景
  async compileHandleCreateRole(params) {
    let result,
      transaction = null
    try {
      // 开启事务
      transaction = await this.ctx.model.transaction()
      result = await this.createRolePublicFn(params, transaction)
      // 提交事务
      await transaction.commit()
    } catch (error) {
      // 回滚事务
      await transaction.rollback()
      return this.error({
        error_message: error,
      })
    }
    await this.success({
      result,
    })
  }

  // 创建角色的关联关系
  async createRoleRelation(role_id, params, transaction) {
    /**
     * 同步角色菜单表
     * 逻辑：当前如果只选择了子菜单，则默认将父菜单也加入其中
     */
    let menuRoleInfo, permissionRoleInfo
    if (params.menu_list.length) {
      let menuList = [...params.menu_list]
      // 获取当前菜单的父菜单
      const promiseResolve = await Promise.all(
        menuList.map((item) =>
          (async () => {
            const result = await this.ctx.service.menu.index.getMenuDetailById(
              item
            )
            return result.dataValues.menu_parent
          })()
        )
      )
      // 参数去重 + 去除null -> 拼接当前菜单+其父菜单
      menuList = [...new Set([...menuList, ...promiseResolve])].filter(
        (item) => item
      )
      const data = menuList.map((item) => {
        return {
          role_id,
          menu_id: item,
        }
      })
      menuRoleInfo = await this.ctx.service.menuRole.index.createMenuRole(
        data,
        transaction
      )
    }
    // 同步角色权限表
    if (params.permission_list.length) {
      // 参数去重
      const permissionList = [...new Set(params.permission_list)]

      const data = permissionList.map((item) => {
        return {
          role_id,
          permission_id: item,
        }
      })
      permissionRoleInfo =
        await this.ctx.service.permissionRole.index.createPermissionRole(
          data,
          transaction
        )
    }
    return [menuRoleInfo, permissionRoleInfo]
  }

  // 创建角色公共方法
  async createRolePublicFn(params, transaction) {
    // 同步角色表
    const roleInfo = await this.ctx.service.role.index.createRole(
      params,
      transaction
    )
    const role_id = roleInfo.dataValues.id
    const createRelationResult = await this.createRoleRelation(
      role_id,
      params,
      transaction
    )
    return [{ role_id }, ...createRelationResult]
  }

  // 删除角色
  async deleteRole() {
    // 获取参数
    const params = this.ctx.request.body
    // 定义rules
    const rules = {
      role_id: "int",
    }
    // 校验参数
    const errors = await this.app.validator.validate(rules, params)
    if (errors) {
      // 如果Errors有值,则代表参数校验失败，调用自定义的error返回结果
      this.error({ error_message: `${errors[0].field}: ${errors[0].message}` })
      return
    }
    let result,
      transaction = null
    try {
      // 开启事务
      transaction = await this.ctx.model.transaction()
      result = await this.deleteRolePublicFn(params, transaction)
      // 提交事务
      await transaction.commit()
    } catch (error) {
      // 回滚事务
      await transaction.rollback()
      return this.error({
        error_message: error,
      })
    }
    this.success({
      result,
    })
  }

  // 删除与角色的关联关系
  async deleteRoleRelation(params, transaction) {
    // 删除角色菜单信息
    const deleteRoleMenuResult =
      await this.ctx.service.menuRole.index.deleteMenuRole(params, transaction)
    // 删除角色权限信息
    const deleteRolePermissionResult =
      await this.ctx.service.permissionRole.index.deletePermissionRole(
        params,
        transaction
      )
    return [deleteRoleMenuResult, deleteRolePermissionResult]
  }

  // 删除角色公共方法
  async deleteRolePublicFn(params, transaction) {
    // 删除角色信息
    const deleteRoleResult = await this.ctx.service.role.index.deleteRole(
      params,
      transaction
    )
    const deleteRoleRelationResult = await this.deleteRoleRelation(
      params,
      transaction
    )
    return [deleteRoleResult, [...deleteRoleRelationResult]]
  }

  // 更新角色
  async updateRoleInfo(params, transaction) {
    return await this.ctx.service.role.index.updateRole(params, transaction)
  }

  // 编辑角色信息公共方法
  async updateRolePublicFn(params, transaction) {
    // 更改角色信息
    const updateResult = await this.updateRoleInfo(params, transaction)
    // 删除角色之前绑定的关联关系
    const deleteResult = await this.deleteRoleRelation(params, transaction)
    // 创建角色的关联关系
    const createResult = await this.createRoleRelation(
      params.role_id,
      params,
      transaction
    )
    return [updateResult, deleteResult, createResult]
  }

  // 获取角色列表
  async getRoleList() {
    // 获取参数
    const params = this.ctx.query
    let result = null
    try {
      result = await this.ctx.service.role.index.getRoleList(params)
    } catch (e) {
      console.log(e)
      return this.error({ error_message: e })
    }
    this.success({
      total: result.count,
      list: result.rows,
    })
  }

  // 获取角色详情
  async getRoleDetail() {
    // 获取参数
    const params = this.ctx.query
    // 定义校验规则
    const rules = {
      role_id: "int",
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
      result = await this.ctx.service.role.index.getRoleDetail(params)
      // 为满足前端树形结构展示，在此过滤父级菜单,只留下最底层的子菜单
      const role_menu = result.dataValues.role_menu
        .filter((item) => {
          if (!item.dataValues.parent?.dataValues?.menu_parent) {
            // 如果没有menu_parent，则证明为顶级菜单
            if (!item.dataValues.parent?.dataValues?.children?.length) {
              // 顶级菜单并且没有子菜单的一级菜单，正常返回
              return true
            }
            return false
          }
          return true
        })
        .map((res) => res.dataValues.parent)
      if (result.dataValues) {
        result.dataValues.role_menu = role_menu
      }
    } catch (e) {
      return this.error({ error_message: e })
    }
    this.success({
      ...result.dataValues,
    })
  }
}

module.exports = RoleController
