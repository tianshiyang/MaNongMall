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
  router.post(
    "/api/goods/updateInventory",
    controller.goods.index.updateInventory
  )

  // 更新上架状态
  router.post(
    "/api/goods/UpdateListingStatus",
    controller.goods.index.UpdateListingStatus
  )

  // 获取商品详情
  router.get("/api/goods/getGoodsDetail", controller.goods.index.getGoodsDetail)

  // // 获取当前角色所能售卖的所有商品
  // router.get(
  //   "/api/goods/getCurrentRoleAllGoods",
  //   controller.goods.index.getCurrentRoleAllGoods
  // )
}
