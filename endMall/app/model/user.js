"use strict"
module.exports = (app) => {
  const { STRING, BIGINT, BOOLEAN } = app.Sequelize

  const User = app.model.define(
    "user",
    {
      id: {
        type: BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "主键ID",
      },
      username: {
        type: STRING(11),
        allowNull: false,
        comment: "姓名",
      },
      phone: {
        type: STRING(11),
        allowNull: false,
        comment: "手机号",
        unique: true,
      },
      password: {
        type: STRING(16),
        allowNull: false,
        comment: "密码",
      },
      account_number: {
        type: STRING(36),
        allowNull: false,
        comment: "账号",
        unique: true,
      },
      id_number: {
        type: STRING(18),
        allowNull: false,
        comment: "身份证号",
        unique: true,
      },
      is_depart: {
        type: BOOLEAN,
        defaultValue: false,
        comment: "是否离职",
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

  return User
}
