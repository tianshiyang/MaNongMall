const BaseController = require("./BaseController")

class GoodsClassificationController extends BaseController {
  // 获取当前人员所能售卖的商品分类
  async getCurrentSellerCanSellGoodsClassification() {
    const userInfo = await this.getUserTokenVerify()
    // 判断当前用户是不是超管
    const is_admin = await this.hasRole("SUPPER_ADMIN")
    try {
      let result = null
      if (!is_admin) {
        // 获取当前用户所拥有的角色
        const role = await this.ctx.service.userRole.index.getUserRole(
          userInfo.user_id
        )
        const role_list = role.map((item) => item.role_info.id)
        // 获取每个角色所对应的所有分类
        result =
          await this.ctx.service.roleGoodsClassification.index.getAllClassificationByRoleList(
            role_list
          )
      } else {
        // 如果是admin角色，则不需要过滤商品分类
        result =
          await this.ctx.service.roleGoodsClassification.index.getAllClassificationByRoleList()
      }
      // 去重数据, 并且转化为前端所需要的数据
      const res = new Map()
      const data = result
        .filter(
          (item) =>
            !res.has(item.classification_info.dataValues.id) &&
            res.set(item.classification_info.dataValues.id, 1)
        )
        .map((item) => item.classification_info)
      return Promise.resolve(data)
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

module.exports = GoodsClassificationController
