const ignorePatterns = require("config").get("ignorePatterns");

const isIgnored = (filename) =>
  ignorePatterns.some((pattern) => new RegExp(pattern, "i").test(filename));

module.exports = isIgnored;
