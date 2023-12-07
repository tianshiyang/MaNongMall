/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller, middleware } = app
  const __JWT = middleware.jwtHandler()
  router.post("/api/login", __JWT, controller.home.index)
  router.post("/public/login/login", controller.home.login)
}
