/**
 * @param {Egg.Application} app - egg application
 */
const Users = require("./routes/user")
const Permission = require("./routes/permission")

module.exports = (app) => {
  // 用户相关
  Users(app)
  // 权限相关
  Permission(app)
}
