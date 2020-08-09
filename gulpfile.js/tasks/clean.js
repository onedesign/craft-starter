const del = require("del");
const config = require("../config");

function clean() {
  return del(config.clean.paths);
}

module.exports = clean;
