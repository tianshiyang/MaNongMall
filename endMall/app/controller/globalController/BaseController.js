const { Controller } = require("egg")

class BaseController extends Controller {
  // 定义成功的返回格式
  success(data) {
    this.ctx.status = 200
    this.ctx.body = {
      data,
      isSuccess: true,
    }
  }

  /**
   * 定义失败的返回格式
   * @param {Object} errorData 处理错误的返回数据，包装到response中的data返回
   */
  error(errorData = {}) {
    this.ctx.status = 200
    this.ctx.body = {
      data: {
        error_message: "执行失败",
        ...errorData,
      },
      isSuccess: false,
    }
  }

  // 获取Token信息
  async getUserTokenVerify() {
    // 解码token
    return this.ctx.app.jwt.verify(
      this.ctx.request.header.authorization,
      this.ctx.app.jwt.secret
    )
  }

  // 判断当前用户是否具有某个角色
  async hasRole(role_sign) {
    const { user_id } = await this.getUserTokenVerify()
    // 获取当前用户所拥有的角色标识
    const role = await this.ctx.service.userRole.index.getUserRole(user_id)
    const role_list = role.map((item) => item.role_info.role_sign)
    return role_list.includes(role_sign)
  }

  // 获取用户所有权限
  async getUserAllPermission() {
    try {
      const userInfo = await this.getUserTokenVerify()
      // 获取用户所有角色
      const roleList = await this.ctx.service.userRole.index.getUserOnlyRole(
        userInfo.user_id
      )
      // 获取当前用户的所有权限列表
      const allPermissionIdsPromise = roleList.map(
        async (item) =>
          await this.ctx.service.permissionRole.index.getRolePermissions(
            item.role_id
          )
      )
      const allPermissionIds = await Promise.all(allPermissionIdsPromise)
      // 去重allPermissionIds中permission重复的权限
      const permissionIdsArr = [
        ...new Set(allPermissionIds.flat(2).map((item) => item.permission_id)),
      ]
      // 返回权限详情
      const result = await Promise.all(
        permissionIdsArr.map(
          // 通过权限ID查找权限详情
          async (item) =>
            await this.ctx.service.permission.index.getPermissionDetail({
              permission_id: item,
            })
        )
      )
      return Promise.resolve(result)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  // 判断当前用户是否具有某个权限
  async hasPermission(permission_sign) {
    const result = await this.getUserAllPermission()
    const permission_list = result.map(
      (item) => item.dataValues.permission_sign
    )
    return permission_list.includes(permission_sign)
  }
}

module.exports = BaseController
