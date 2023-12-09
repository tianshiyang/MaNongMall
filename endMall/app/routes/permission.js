// 用户操作相关的路由

module.exports = (app) => {
  const { router, controller, middleware } = app
  const __JWT = middleware.jwtHandler()

  // 编辑、创建权限
  router.post(
    "/api/permission/updatePermission",
    __JWT,
    controller.permission.index.updatePermission
  )
}
