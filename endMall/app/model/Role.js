"use strict"
module.exports = (app) => {
  const { STRING, BIGINT, BOOLEAN } = app.Sequelize

  const Role = app.model.define(
    "role",
    {
      id: {
        type: BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "主键ID",
      },
      role_name: {
        type: STRING(10),
        allowNull: false,
        comment: "角色名称",
      },
      role_sign: {
        type: STRING(20),
        allowNull: false,
        comment: "角色标识",
        unique: true,
      },
      role_remark: {
        type: STRING(100),
        allowNull: false,
        comment: "角色备注",
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

  // 声明角色与其他表关联关系
  Role.associate = function () {
    // 与菜单表的关联关系声明，一个角色表中，包含多个角色菜单表
    Role.hasMany(app.model.MenuRole, {
      foreignKey: "role_id",
      as: "role_menu",
    })
    // 与权限表的关联关系声明，一个角色表中，包含多个角色权限表
    Role.hasMany(app.model.PermissionRole, {
      foreignKey: "role_id",
      as: "permission_role",
    })
  }

  return Role
}
