/**
 * @param {Egg.Application} app - egg application
 */
const Users = require("./routes/user")
const Permission = require("./routes/permission")
const Menu = require("./routes/menu")
const role = require("./routes/role")
const goodsClassification = require("./routes/goodsClassification")

module.exports = (app) => {
  // 用户相关
  Users(app)
  // 权限相关
  Permission(app)
  // 菜单相关
  Menu(app)
  // 角色相关
  role(app)
  // 商品分类相关
  goodsClassification(app)
}
