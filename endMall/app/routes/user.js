// 用户操作相关的路由

module.exports = (app) => {
  const { router, controller } = app
  // const __JWT = middleware.jwtHandler()

  // 登录
  router.get("/api/user/login", controller.user.index.login)
  // 创建员工
  router.post("/api/user/addUser", controller.user.index.addUser)
  // 创建员工
  router.post("/api/user/updateUser", controller.user.index.updateUser)
  // 操作员工离职
  router.post("/api/user/makeUserDepart", controller.user.index.makeUserDepart)
  // 更改员工密码
  router.post(
    "/api/user/updateUserPassword",
    controller.user.index.updateUserPassword
  )
}
