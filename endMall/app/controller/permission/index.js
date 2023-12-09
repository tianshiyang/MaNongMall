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
    // 定义校验rules
    const rules = {
      type: "int",
    }
    // 校验参数
    const errors = await this.app.validator.validate(rules, params)
    if (errors) {
      // 如果Errors有值,则代表参数校验失败，调用自定义的error返回结果
      this.error({ error_message: `${errors[0].field}: ${errors[0].message}` })
      return
    }
    let result = null
    // 通过参数确认返回的数据范围
    if (params.type === 1) {
      // 作为列表搜索（包含删除的）
    } else if (params.type === 2) {
      // 作为筛选条件搜索（不包含删除的）
      params.is_delete = 0
    }
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

  // 删除权限 - 逻辑删除
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
    let result = null
    try {
      result = await this.ctx.service.permission.index.deletePermission(params)
    } catch (e) {
      return this.error({ error_message: e.errors[0].message })
    }
    console.log(result[0])
    if (result[0] >= 1) {
      this.success({
        message: "删除成功！",
      })
    } else {
      this.error({ error_message: "当前权限不存在" })
    }
  }
}

module.exports = PermissionController
