"use strict"
module.exports = (app) => {
  const { STRING, BIGINT, BOOLEAN } = app.Sequelize

  const Role = app.model.define(
    "permission",
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
        unique: true,
      },
      permission_remark: {
        type: STRING(100),
        allowNull: false,
        comment: "权限描述",
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

  return Role
}
