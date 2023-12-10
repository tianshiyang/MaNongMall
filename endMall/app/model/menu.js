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
    // 与菜单的关联关系声明，通过menu_parent关联子菜单，并且一个父级菜单有多个子菜单
    Menu.hasMany(app.model.Menu, {
      foreignKey: "menu_parent",
      as: "children",
    })
    // 与菜单的关联关系声明 -> 子菜单通过id关联父级菜单, 并且一个子菜单只属于一个父级菜单的子菜单
    Menu.belongsTo(app.model.Menu, {
      foreignKey: "id",
    })
  }

  return Menu
}
