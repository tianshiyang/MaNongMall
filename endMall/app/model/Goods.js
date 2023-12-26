"use strict"
module.exports = (app) => {
  const { STRING, BIGINT, DECIMAL, INTEGER, DATE, BOOLEAN } = app.Sequelize

  const Goods = app.model.define(
    "goods",
    {
      id: {
        type: BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "主键ID",
      },
      goods_name: {
        type: STRING(50),
        allowNull: false,
        comment: "商品名称",
      },
      goods_classification: {
        type: BIGINT(11),
        allowNull: false,
        comment: "商品分类",
      },
      inventory: {
        type: BIGINT(11),
        allowNull: false,
        comment: "库存",
      },
      purchase_price: {
        type: DECIMAL(10, 2),
        allowNull: false,
        comment: "商品进价",
      },
      price: {
        type: DECIMAL(10, 2),
        allowNull: false,
        comment: "商品售价",
      },
      discount: {
        type: INTEGER,
        comment: "折扣",
      },
      discount_time: {
        type: DATE,
        comment: "折扣时间",
      },
      listing_status: {
        type: BOOLEAN,
        defaultValue: true,
        comment: "上架状态：默认上架",
      },
    },
    {
      freezeTableName: true, // 取消复数
      timestamps: true, // 开启时间戳
      createdAt: "create_time",
      updatedAt: "update_time",
    }
  )

  return Goods
}
