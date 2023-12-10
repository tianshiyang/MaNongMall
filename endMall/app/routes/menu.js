// 菜单操作相关的路由

module.exports = (app) => {
  const { router, controller, middleware } = app
  const __JWT = middleware.jwtHandler()

  // 编辑、创建菜单
  router.post("/api/menu/updateMenu", __JWT, controller.menu.index.updateMenu)

  // 获取权限列表
  router.get("/api/menu/getMenuList", __JWT, controller.menu.index.getMenuList)
}
