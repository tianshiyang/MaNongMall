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
    },
    {
      freezeTableName: true, // 取消复数
      timestamps: true, // 开启时间戳
      createdAt: "create_time",
      updatedAt: "update_time",
    }
  )

  // 声明菜单表的关联关系
  Menu.associate = function () {
    // 与菜单的关联关系声明，一个菜单列表中，包含多个子菜单。此处使用menu_parent作外建，关联另一个菜单表的主键
    Menu.hasMany(app.model.Menu, {
      foreignKey: "menu_parent",
      as: "children",
    })
    Menu.hasOne(app.model.Menu, {
      foreignKey: "id",
      sourceKey: "menu_parent",
      as: "parent",
    })
  }

  return Menu
}
