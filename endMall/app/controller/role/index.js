const BaseController = require("../globalController/BaseController")
class RoleController extends BaseController {
  // 编辑、创建权限
  async updateRole() {
    // Post请求，通过this.ctx.request.body获取参数
    // 获取参数
    const params = this.ctx.request.body
    // 转化参数
    console.log(JSON.parse(params.menu_list))
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
      rules.permission_id = "int"
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
    } else {
      // 新增场景
      let result = null
      try {
        result = await this.createRole(params)
      } catch (error) {
        console.log(error, "error=========")
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
  async createRole(params) {
    // 创建事务
    let transaction = null
    let result = null
    try {
      transaction = await this.ctx.model.transaction()
      let menuRoleInfo, permissionRoleInfo
      // 同步角色表
      const roleInfo = await this.ctx.service.role.index.createRole(
        params,
        transaction
      )
      // 同步角色菜单表
      if (params.menu_list.length) {
        const data = params.menu_list.map((item) => {
          return {
            role_id: roleInfo.dataValues.id,
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
        const data = params.permission_list.map((item) => {
          return {
            role_id: roleInfo.dataValues.id,
            permission_id: item,
          }
        })
        permissionRoleInfo =
          await this.ctx.service.permissionRole.index.createPermissionRole(
            data,
            transaction
          )
      }
      result = [roleInfo, menuRoleInfo, permissionRoleInfo]
      // 提交事务
      await transaction.commit()
    } catch (e) {
      // 出错后事务回滚
      await transaction.rollback()
      return Promise.reject(e.errors[0].message)
    }
    return result
  }
}

module.exports = RoleController
