// 商品相关的路由

module.exports = (app) => {
  const { router, controller, middleware } = app
  const __JWT = middleware.jwtHandler()

  // 创建订单
  router.post(
    "/api/order/createOrder",
    __JWT,
    controller.order.index.createOrder
  )
  // 获取订单列表
  router.get(
    "/api/order/getOrderList",
    __JWT,
    controller.order.index.getOrderList
  )

  // 查询当前商品的售卖数据统计
  router.get(
    "/api/order/getSalesDataStatistics",
    controller.order.index.getSalesDataStatistics
  )
}
