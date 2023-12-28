// 商品相关的路由

module.exports = (app) => {
  const { router, controller, middleware } = app
  const __JWT = middleware.jwtHandler()

  // 编辑、创建订单
  router.post(
    "/api/order/createOrder",
    __JWT,
    controller.order.index.updateGoods
  )
}
