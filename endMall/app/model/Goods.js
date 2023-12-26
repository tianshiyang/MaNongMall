"use strict"
module.exports = (app) => {
  const { STRING, BIGINT, DECIMAL, DATE, BOOLEAN } = app.Sequelize

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
        type: DECIMAL(10, 2),
        comment: "折扣",
        default: 1.0,
      },
      discount_time_start: {
        type: DATE,
        comment: "折扣开始时间",
      },
      discount_time_end: {
        type: DATE,
        comment: "折扣结束时间",
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

  // 声明商品表的关联关系
  Goods.associate = function () {
    // 一个商品属于一个商品分类
    Goods.belongsTo(app.model.GoodsClassification, {
      foreignKey: "goods_classification",
      as: "classification",
    })
  }

  return Goods
}
