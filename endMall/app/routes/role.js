// 菜单操作相关的路由

module.exports = (app) => {
  const { router, controller, middleware } = app
  const __JWT = middleware.jwtHandler()

  // 编辑、创建角色
  router.post("/api/role/updateRole", __JWT, controller.role.index.updateRole)
  // 删除角色
  router.post("/api/role/deleteRole", __JWT, controller.role.index.deleteRole)
}
