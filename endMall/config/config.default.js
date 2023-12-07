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

  config.sequelize = {
    dialect: "mysql",
    host: "localhost",
    port: "3306",
    database: "ma_nong_mall",
    password: "12345678",
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
