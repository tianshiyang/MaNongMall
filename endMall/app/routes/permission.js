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

  // 获取权限列表
  router.get(
    "/api/permission/getPermissionList",
    __JWT,
    controller.permission.index.getPermissionList
  )

  // 获取权限详情
  router.get(
    "/api/permission/getPermissionDetail",
    __JWT,
    controller.permission.index.getPermissionDetail
  )

  // 删除权限
  router.post(
    "/api/permission/deletePermission",
    __JWT,
    controller.permission.index.deletePermission
  )
}
