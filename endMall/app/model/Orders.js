"use strict"
module.exports = (app) => {
  const { BIGINT, DECIMAL, INTEGER } = app.Sequelize

  const Orders = app.model.define(
    "orders",
    {
      id: {
        type: BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "主键ID",
      },
      goods_id: {
        type: BIGINT(11),
        allowNull: false,
        comment: "商品id",
      },
      seller_id: {
        type: BIGINT(11),
        allowNull: false,
        comment: "销售id",
      },
      sales_num: {
        type: INTEGER,
        allowNull: false,
        comment: "售卖数量",
      },
      profit: {
        type: DECIMAL(11, 2),
        allowNull: false,
        comment: "获利",
      },
      transaction_volume: {
        type: DECIMAL(11, 2),
        allowNull: false,
        comment: "成交额",
      },
    },
    {
      freezeTableName: true, // 取消复数
      timestamps: true, // 开启时间戳
      createdAt: "create_time",
      updatedAt: "update_time",
    }
  )

  // 声明订单表的关联关系
  Orders.associate = function () {
    // 一个订单商品有属于一个商品
    Orders.belongsTo(app.model.Goods, {
      foreignKey: "goods_id",
      as: "goods_info",
    })
    // 一个订单数据一个销售
    Orders.belongsTo(app.model.User, {
      foreignKey: "seller_id",
      as: "user_info",
    })
  }

  return Orders
}
