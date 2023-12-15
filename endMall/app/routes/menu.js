// 菜单操作相关的路由

module.exports = (app) => {
  const { router, controller, middleware } = app
  const __JWT = middleware.jwtHandler()

  // 编辑、创建菜单
  router.post("/api/menu/updateMenu", __JWT, controller.menu.index.updateMenu)

  // 获取菜单列表
  router.get("/api/menu/getMenuList", __JWT, controller.menu.index.getMenuList)

  // 获取菜单详情
  router.get(
    "/api/menu/getMenuDetail",
    __JWT,
    controller.menu.index.getMenuDetail
  )

  // 获取菜单树形结构
  router.get("/api/menu/getMenuTree", __JWT, controller.menu.index.getMenuTree)

  // 删除菜单
  router.post("/api/menu/deleteMenu", __JWT, controller.menu.index.deleteMenu)
}
