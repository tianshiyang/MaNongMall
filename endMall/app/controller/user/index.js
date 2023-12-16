const BaseController = require("../globalController/BaseController")

class LoginController extends BaseController {
  // 用户登录
  async login() {
    // Get请求，通过this.ctx.query获取参数
    // 定义校验规则
    const rules = {
      account_number: "string",
      password: "string",
    }
    // 校验参数
    const errors = await this.app.validator.validate(rules, this.ctx.query)
    if (errors) {
      // 如果Errors有值,则代表参数校验失败，调用自定义的error返回结果
      this.error({ error_message: `${errors[0].field}: ${errors[0].message}` })
      return
    }
    // 调用service层做数据查询
    let result = null
    try {
      result = await this.ctx.service.user.index.fineUserInfo(this.ctx.query)
    } catch (e) {
      return this.error({ error_message: e.errors[0].message })
    }
    // 找不到用户的信息，或者用户被删除
    if (!result || result.is_delete) {
      return this.error({ error_message: "用户名或密码错误" })
    }
    // 判断用户是否离职
    if (result.is_depart) {
      return this.error({ error_message: "您已离职，请联系老板" })
    }
    // 返回用户的token
    const token = this.ctx.app.jwt.sign(
      {
        user_id: result.id,
        username: result.username,
        account_number: result.account_number,
      },
      this.ctx.app.config.jwt.secret
    )
    this.success({
      token,
    })
  }

  // 新增员工
  async addUser() {
    // Post请求，通过this.ctx.request.body获取参数
    // 获取参数
    const params = this.ctx.request.body
    // 定义校验规则
    const rules = {
      username: "string",
      password: "string",
      phone: "string",
      id_number: "string",
      account_number: "string",
      role_list: "string",
    }
    // 校验参数
    const errors = await this.app.validator.validate(rules, params)
    if (errors) {
      // 如果Errors有值,则代表参数校验失败，调用自定义的error返回结果
      this.error({ error_message: `${errors[0].field}: ${errors[0].message}` })
      return
    }
    let transaction = null
    try {
      // 开启事务
      transaction = await this.ctx.model.transaction()
      // 创建角色
      const userInfo = await this.ctx.service.user.index.addUser(
        params,
        transaction
      )
      const user_id = userInfo.dataValues.id
      const role_list = JSON.parse(params.role_list)
      const data = role_list.map((item) => {
        return {
          user_id,
          role_id: item,
        }
      })
      // 同步创建员工角色
      await this.ctx.service.userRole.index.createUserRole(data, transaction)
      // 提交事务
      await transaction.commit()
    } catch (e) {
      // 回滚事务
      await transaction.rollback()
      return this.error({ error_message: e.errors[0].message })
    }
    return this.success({
      message: "创建成功",
    })
  }

  // 编辑员工信息
  async updateUser() {
    // Post请求，通过this.ctx.request.body获取参数
    // 获取参数
    const params = this.ctx.request.body
    // 定义校验规则
    const rules = {
      user_id: "int",
      username: "string",
      phone: "string",
      id_number: "string",
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
      result = await this.ctx.service.user.index.fineUserInfo({
        user_id: params.user_id,
      })
    } catch (e) {
      return this.error({ error_message: e.errors[0].message })
    }
    if (!result) {
      return this.error({ error_message: "用户不存在" })
    }
    try {
      // 更新用户信息
      await this.ctx.service.user.index.updateUser(params)
    } catch (e) {
      return this.error({ error_message: e.errors[0].message })
    }
    return this.success({
      message: "更新成功",
    })
  }

  // 操作员工离职
  async makeUserDepart() {
    // Post请求，通过this.ctx.request.body获取参数
    // 获取参数
    const params = this.ctx.request.body
    // 定义校验规则
    const rules = {
      user_id: "int",
    }
    // 校验参数
    const errors = await this.app.validator.validate(rules, params)
    if (errors) {
      // 如果Errors有值,则代表参数校验失败，调用自定义的error返回结果
      this.error({ error_message: `${errors[0].field}: ${errors[0].message}` })
      return
    }
    try {
      await this.ctx.service.user.index.makeUserDepart(params)
    } catch (e) {
      return this.error({ error_message: e.errors[0].message })
    }
    return this.success({
      message: "操作成功",
    })
  }

  // 更新员工密码
  async updateUserPassword() {
    // Post请求，通过this.ctx.request.body获取参数
    // 获取参数
    const params = this.ctx.request.body
    // 定义校验规则
    const rules = {
      user_id: "int",
      password: "string",
    }
    // 校验参数
    const errors = await this.app.validator.validate(rules, params)
    if (errors) {
      // 如果Errors有值,则代表参数校验失败，调用自定义的error返回结果
      this.error({ error_message: `${errors[0].field}: ${errors[0].message}` })
      return
    }
    try {
      await this.ctx.service.user.index.updateUserPassword(params)
    } catch (e) {
      return this.error({ error_message: e.errors[0].message })
    }
    return this.success({
      message: "操作成功",
    })
  }

  // 获取用户详情
  async getUserDetail() {
    // 获取参数
    const params = this.ctx.query
    // 定义校验规则
    const rules = {
      user_id: "int",
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
      result = await this.ctx.service.user.index.fineUserInfo(params)
    } catch (e) {
      return this.error({ error_message: e.errors[0].message })
    }
    return this.success({
      ...result.dataValues,
    })
  }
}

module.exports = LoginController
