const BaseController = require("../globalController/BaseController")

class PermissionController extends BaseController {
  // 编辑、创建权限
  async updatePermission() {
    // Post请求，通过this.ctx.request.body获取参数
    // 获取参数
    const params = this.ctx.request.body
    // 定义校验规则
    const rules = {
      permission_name: "string",
      permission_remark: "string",
    }
    if (!params.permission_id) {
      // 创建 -> 需要校验权限标识
      rules.permission_sign = "string"
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
      // 编辑
      let result = null
      try {
        result = await this.ctx.service.permission.index.updatePermission(
          params
        )
      } catch (e) {
        return this.error({ error_message: e.errors[0].message })
      }
      if (result[0] === 0) {
        // 编辑的时候，可能因为ID不存在，所以没有数据被更改
        return this.error({ error_message: "没有此条权限" })
      }
      this.success({
        message: "操作成功！",
      })
    } else {
      // 新增
      let result = null
      try {
        result = await this.ctx.service.permission.index.createPermission(
          params
        )
      } catch (e) {
        return this.error({ error_message: e.errors[0].message })
      }
      // 返回创建完成的权限信息
      this.success({
        ...result.dataValues,
        message: "创建成功！",
      })
    }
  }

  // 获取权限列表
  async getPermissionList() {
    // 获取参数
    const params = this.ctx.query
    let result = null
    try {
      result = await this.ctx.service.permission.index.getPermissionList(params)
    } catch (e) {
      return this.error({ error_message: e.errors[0].message })
    }
    return this.success({
      total: result.count,
      list: result.rows,
    })
  }

  // 获取权限详情
  async getPermissionDetail() {
    // 获取参数
    const params = this.ctx.query
    // 定义校验rules
    const rules = {
      permission_id: "int",
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
      result = await this.ctx.service.permission.index.getPermissionDetail(
        params
      )
    } catch (e) {
      return this.error({ error_message: e.errors[0].message })
    }
    if (!result || !result.dataValues) {
      this.error({ error_message: "没有找到对应的数据" })
      return
    }
    return this.success({
      ...result.dataValues,
    })
  }

  // 获取当前权限关联的角色信息
  async checkCurrentPermissionRoleInfo(permission_id) {
    const relationRoleInfo =
      await this.ctx.service.permissionRole.index.checkCurrentPermissionRoleInfo(
        permission_id
      )
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

  // 删除权限
  async deletePermission() {
    // 获取参数
    const params = this.ctx.request.body
    // 定义校验rules
    const rules = {
      permission_id: "int",
    }
    // 校验参数
    const errors = await this.app.validator.validate(rules, params)
    if (errors) {
      // 如果Errors有值,则代表参数校验失败，调用自定义的error返回结果
      this.error({ error_message: `${errors[0].field}: ${errors[0].message}` })
      return
    }
    // 获取当前权限与订单的绑定关系，如果绑定了角色，则不可删除
    try {
      await this.checkCurrentPermissionRoleInfo(params.permission_id)
    } catch (e) {
      return this.error({
        error_message: `创建失败，当前权限与${e + ""}关联`,
      })
    }
    let result = null
    try {
      result = await this.ctx.service.permission.index.deletePermission(params)
    } catch (e) {
      return this.error({ error_message: e.errors[0].message })
    }
    if (result >= 1) {
      this.success({
        message: "删除成功！",
      })
    } else {
      this.error({ error_message: "当前权限不存在" })
    }
  }
}

module.exports = PermissionController
