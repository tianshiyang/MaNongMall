"use strict"
module.exports = (app) => {
  const { BIGINT, BOOLEAN } = app.Sequelize

  const Role = app.model.define(
    "user_role",
    {
      id: {
        type: BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "主键ID",
      },
      user_id: {
        type: BIGINT(11),
        allowNull: false,
        comment: "用户表主键ID",
      },
      role_id: {
        type: BIGINT(11),
        allowNull: false,
        comment: "角色表主键id",
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
