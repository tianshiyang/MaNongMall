/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  cors: {
    enable: true,
    package: "egg-cors",
  },
  jwt: {
    enable: true,
    package: "egg-jwt",
  },
  mysql: {
    enable: true,
    package: "egg-mysql",
  },
  sequelize: {
    enable: true,
    package: "egg-sequelize",
  },
  validate: {
    enable: true,
    package: "egg-validate",
  },
}
