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
    controller.classification.index.getGoodsClassificationList
  )
}
