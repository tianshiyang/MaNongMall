"use strict"
module.exports = (app) => {
  const { STRING, BIGINT, BOOLEAN } = app.Sequelize

  const Menu = app.model.define(
    "menu",
    {
      id: {
        type: BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "主键ID",
      },
      menu_name: {
        type: STRING(10),
        allowNull: false,
        comment: "菜单名称",
      },
      menu_path: {
        type: STRING(30),
        allowNull: false,
        comment: "菜单路径",
        unique: true,
      },
      menu_parent: {
        type: BIGINT(11),
        comment: "父级菜单ID",
      },
      is_disabled: {
        type: BOOLEAN,
        defaultValue: false,
        comment: "是否禁用",
      },
      is_delete: {
        type: BOOLEAN,
        defaultValue: false,
        comment: "逻辑删除",
      },
    },
    {
      freezeTableName: true, // 取消复数
      timestamps: true, // 开启时间戳
      createdAt: "create_time",
      updatedAt: "update_time",
    }
  )

  return Menu
}
