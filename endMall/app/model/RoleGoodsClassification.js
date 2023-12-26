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

  // 声明菜单表的关联关系
  RoleGoodsClassification.associate = function () {
    // 与菜单的关联关系声明，一个菜单列表中，包含多个子菜单。此处使用menu_parent作外建，关联另一个菜单表的主键
    RoleGoodsClassification.hasOne(app.model.Role, {
      foreignKey: "id",
      sourceKey: "role_id",
      as: "role_info",
    })
  }

  return RoleGoodsClassification
}
