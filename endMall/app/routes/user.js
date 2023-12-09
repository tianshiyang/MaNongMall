// 用户操作相关的路由

module.exports = (app) => {
  const { router, controller } = app
  // const __JWT = middleware.jwtHandler()

  router.get("/api/user/login", controller.user.login.login)
}
