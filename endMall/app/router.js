/**
 * @param {Egg.Application} app - egg application
 */
const Users = require("./routes/user")
module.exports = (app) => {
  Users(app)
}
