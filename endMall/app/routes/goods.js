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

  // 获取商品列表
  router.get("/api/goods/getGoodsList", controller.goods.index.getGoodsList)

  // 更新库存
  router.post("/api/goods/updateInventory", controller.goods.index.updateInventory)
}
