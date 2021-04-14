const config = require("config");

const isIgnored = (filename) =>
  config
    .get("ignorePatterns")
    .some((pattern) => new RegExp(pattern, "i").test(filename));

module.exports = isIgnored;
