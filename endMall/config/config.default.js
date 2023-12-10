/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_maNongMall"

  // add your middleware config here
  // 这里配置全局中间件
  config.middleware = []

  config.security = {
    // 配置csrf攻击
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ["*"], // 配置白名单
  }

  config.cors = {
    origin: "*", // 允许所有跨域访问
    credentials: true, // 允许 Cookie 跨域跨域
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
  }

  config.jwt = {
    secret: "MaNongMall",
    sign: {
      expiresIn: 7 * (24 * 60 * 60), // 7天免登录
    },
  }

  /**
   *
   * convert: 会对入参进行转换，建议开启
   *          举个例子，使用表单中默认的 submit 类型按钮提交表单时，提交过来的往往是序列化后的字符串，
   *          那些期望是数字类型的字段就会始终验证不过。而开启此项后，会对入参按希望的类型进行转换
   *
   * validateRoot:  限制被验证值必须是一个对象。
   * widelyUndefined: 开启后，会把空字符串，NaN,null 这些转成 undefined，将这些异常的数据进行了统一，方便后续处理
   *
   */
  config.validate = {
    // 配置参数校验器，基于parameter
    convert: true,
    // validateRoot: false,
    widelyUndefined: true,
  }

  config.sequelize = {
    dialect: "mysql",
    host: "localhost",
    port: "3306",
    timezone: "+08:00", // 选时区
    database: "ma_nong_mall",
    password: "12345678",
    dialectOptions: {
      // 返回格式YYYY-MM-DD HH:ss:mm
      dateStrings: true,
      typeCast: true,
    },
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  return {
    ...config,
    ...userConfig,
  }
}
