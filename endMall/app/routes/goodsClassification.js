// 商品分类相关的路由

module.exports = (app) => {
  const { router, controller, middleware } = app
  const __JWT = middleware.jwtHandler()

  // 编辑、创建商品分类
  router.post(
    "/api/classification/updateGoodsClassification",
    __JWT,
    controller.classification.index.updateGoodsClassification
  )
  // 获取商品分类列表
  router.get(
    "/api/classification/getGoodsClassificationList",
    __JWT,
    controller.classification.index.getGoodsClassificationList
  )
  // 获取当前角色所具有的分类
  router.get(
    "/api/classification/getCurrentUserHasClassificationList",
    __JWT,
    controller.classification.index.getCurrentUserHasClassificationList
  )
  // 获取当前分类详情
  router.get(
    "/api/classification/getGoodsClassificationDetail",
    __JWT,
    controller.classification.index.getGoodsClassificationDetail
  )
}
