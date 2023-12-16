// 用户操作相关的路由

module.exports = (app) => {
  const { router, controller, middleware } = app
  const __JWT = middleware.jwtHandler()

  // 登录
  router.get("/api/user/login", controller.user.index.login)
  // 创建员工
  router.post("/api/user/addUser", __JWT, controller.user.index.addUser)
  // 创建员工
  router.post("/api/user/updateUser", __JWT, controller.user.index.updateUser)
  // 操作员工离职
  router.post(
    "/api/user/makeUserDepart",
    __JWT,
    controller.user.index.makeUserDepart
  )
  // 更改员工密码
  router.post(
    "/api/user/updateUserPassword",
    __JWT,
    controller.user.index.updateUserPassword
  )
  // 获取用户信息
  router.get(
    "/api/user/getUserDetail",
    __JWT,
    controller.user.index.getUserDetail
  )
  // 更新用户角色
  router.post(
    "/api/user/updateUserRole",
    __JWT,
    controller.user.index.updateUserRole
  )
}
