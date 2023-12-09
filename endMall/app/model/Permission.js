"use strict"
module.exports = (app) => {
  const { BIGINT, BOOLEAN, STRING } = app.Sequelize

  const RolePermission = app.model.define(
    "role_menu",
    {
      id: {
        type: BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "主键ID",
      },
      permission_name: {
        type: STRING(10),
        allowNull: false,
        comment: "权限名称",
      },
      permission_sign: {
        type: STRING(20),
        allowNull: false,
        comment: "权限标识",
      },
      permission_remark: {
        type: STRING(100),
        allowNull: false,
        comment: "权限描述",
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

  return RolePermission
}
