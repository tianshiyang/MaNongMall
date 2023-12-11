const BaseController = require("../globalController/BaseController")
const { transaction } = require("sequelize")

class RoleController extends BaseController {
  // 编辑、创建权限
  async updateRole() {
    // Post请求，通过this.ctx.request.body获取参数
    // 获取参数
    const params = this.ctx.request.body
    // 定义校验规则
    const rules = {
      role_name: "string",
      role_remark: "string",
      menu_list: {
        type: "array",
        allowEmpty: true,
      },
      role_list: {
        type: "array",
        allowEmpty: true,
      },
    }
    if (!params.permission_id) {
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

    if (params.permission_id) {
      // 编辑场景
    } else {
      // 新增场景
      let result = null
      try {
        result = this.createRole(params)
      } catch (error) {
        this.error({
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
    const work = await transaction()
    let result = null
    try {
      const workArray = []
      // 同步角色表
      workArray.push(this.ctx.service.role.index.createRole(params))
      // 同步角色菜单表
      if (params.menu_list.length) {
        const data = params.menu_list.map((item) => {
          return {
            role_id: params.role_id,
            menu_id: item,
          }
        })
        workArray.push(this.ctx.service.menuRole.index.createMenuRole(data))
      }
      // 同步角色权限表
      if (params.permission_list.length) {
        const data = params.menu_list.map((item) => {
          return {
            role_id: params.role_id,
            permission_id: item,
          }
        })
        workArray.push(
          this.ctx.service.permissionRole.index.createPermissionRole(data)
        )
      }
      result = await Promise.all(workArray)
      // 提交事务
      await work.commit()
    } catch (e) {
      // 出错后事务回滚
      await work.rollback()
      return Promise.reject(e)
    }
    return result
  }
}

module.exports = RoleController