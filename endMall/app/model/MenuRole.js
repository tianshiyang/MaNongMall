"use strict"
module.exports = (app) => {
  const { BIGINT } = app.Sequelize

  const MenuRole = app.model.define(
    "role_menu",
    {
      id: {
        type: BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "主键ID",
      },
      menu_id: {
        type: BIGINT(11),
        allowNull: false,
        comment: "菜单表主键ID",
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

  return MenuRole
}