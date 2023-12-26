"use strict"
module.exports = (app) => {
  const { BIGINT } = app.Sequelize

  const RoleGoodsClassification = app.model.define(
    "role_goods_classification",
    {
      id: {
        type: BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "主键ID",
      },
      goods_classification_id: {
        type: BIGINT(11),
        allowNull: false,
        comment: "商品分类表主键ID",
      },
      role_id: {
        type: BIGINT(11),
        allowNull: false,
        comment: "角色表主键id",
      },
    },
    {
      freezeTableName: true, // 取消复数
      timestamps: true, // 开启时间戳
      createdAt: "create_time",
      updatedAt: "update_time",
    }
  )

  // 声明商品分类角色表的关联关系
  RoleGoodsClassification.associate = function () {
    // 与商品分类角色表的关联关系声明，一个商品分类角色对应一个角色信息
    RoleGoodsClassification.hasOne(app.model.Role, {
      foreignKey: "id",
      sourceKey: "role_id",
      as: "role_info",
    })
    // 与商品分类角色表的关联关系声明，一个商品分类角色对应一个分类信息
    RoleGoodsClassification.hasOne(app.model.GoodsClassification, {
      foreignKey: "id",
      sourceKey: "goods_classification_id",
      as: "classification_info",
    })
  }

  return RoleGoodsClassification
}
