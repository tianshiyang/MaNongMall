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

  return Orders
}
