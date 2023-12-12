const BaseController = require("../globalController/BaseController")
class RoleController extends BaseController {
  // 编辑、创建权限
  async updateRole() {
    // Post请求，通过this.ctx.request.body获取参数
    // 获取参数
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
      // 编辑场景
      let result = null
      // 开启事务
      let transaction = null
      try {
        // 开启事务
        transaction = await this.ctx.model.transaction()
        result = await this.updateCurrentRole(params, transaction)
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
    } else {
      // 新增场景
      let result = null
      // 开启事务
      let transaction = null
      try {
        transaction = await this.ctx.model.transaction()
        result = await this.createRole(params, transaction)
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
  }

  // 创建角色
  async createRole(params, transaction) {
    let menuRoleInfo, permissionRoleInfo, role_id
    // 同步角色表
    if (params.role_id) {
      // 如果存在用户ID，则为编辑场景，此时不需要重复创建角色
      role_id = params.role_id
    } else {
      // 如果存在用户ID，则为创建场景
      const roleInfo = await this.ctx.service.role.index.createRole(
        params,
        transaction
      )
      role_id = roleInfo.dataValues.id
    }

    // 同步角色菜单表
    if (params.menu_list.length) {
      let menuList = [...params.menu_list]
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
      // 参数去重 + 去除null
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
    return [{ role_id }, menuRoleInfo, permissionRoleInfo]
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

  // 删除角色
  async deleteRolePublicFn(params, transaction) {
    // 删除角色信息
    const deleteRoleResult = await this.ctx.service.role.index.deleteRole(
      params,
      transaction
    )
    // 删除角色菜单信息
    const deleteRoleMenuResult =
      await this.ctx.service.menuRole.index.deleteMenuRole(params, transaction)
    // 删除角色权限信息
    const deleteRolePermissionResult =
      await this.ctx.service.permissionRole.index.deletePermissionRole(
        params,
        transaction
      )
    return [deleteRoleResult, deleteRoleMenuResult, deleteRolePermissionResult]
  }

  // 编辑角色信息
  async updateCurrentRole(params, transaction) {
    const createResult = await this.createRole(params, transaction)
    const deleteResult = await this.deleteRolePublicFn(params, transaction)
    return [deleteResult, createResult]
  }
}

module.exports = RoleController
