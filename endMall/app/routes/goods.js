// 商品相关的路由

module.exports = (app) => {
  const { router, controller, middleware } = app
  const __JWT = middleware.jwtHandler()

  // 编辑、创建商品
  router.post(
    "/api/goods/updateGoods",
    __JWT,
    controller.goods.index.updateGoods
  )
}
