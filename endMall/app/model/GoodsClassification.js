"use strict"
module.exports = (app) => {
  const { STRING, BIGINT } = app.Sequelize

  const GoodsClassification = app.model.define(
    "goods_classification",
    {
      id: {
        type: BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "主键ID",
      },
      classification_name: {
        type: STRING(50),
        allowNull: false,
        comment: "分类名称",
        unique: true,
      },
      classification_remark: {
        type: STRING(200),
        allowNull: false,
        comment: "分类描述",
      },
    },
    {
      freezeTableName: true, // 取消复数
      timestamps: true, // 开启时间戳
      createdAt: "create_time",
      updatedAt: "update_time",
    }
  )

  return GoodsClassification
}
