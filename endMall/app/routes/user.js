// 用户操作相关的路由

module.exports = (app) => {
  const { router, controller } = app
  // const __JWT = middleware.jwtHandler()

  // 登录
  router.get("/api/user/login", controller.user.index.login)
  // 创建员工
  router.post("/api/user/addUser", controller.user.index.addUser)
}
