"use strict"
module.exports = (app) => {
  const { BIGINT } = app.Sequelize

  const UserRole = app.model.define(
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
    },
    {
      freezeTableName: true, // 取消复数
      timestamps: true, // 开启时间戳
      createdAt: "create_time",
      updatedAt: "update_time",
    }
  )

  // 声明用户角色表与其他表关联关系
  UserRole.associate = function () {
    // 关联用户角色表和角色表的一对一关系
    UserRole.belongsTo(app.model.Role, {
      foreignKey: "role_id",
      as: "role_info",
    })
  }

  return UserRole
}
