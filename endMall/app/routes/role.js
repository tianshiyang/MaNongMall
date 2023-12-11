// 菜单操作相关的路由

module.exports = (app) => {
  const { router, controller, middleware } = app
  const __JWT = middleware.jwtHandler()

  // 编辑、创建菜单
  router.post("/api/menu/updateMenu", __JWT, controller.menu.index.updateMenu)
}
