const fs = require("fs-extra");
const chalk = require("chalk");

const debug = require("config").get("debug");

const ensureDir = (dir) =>
  new Promise((resolve, reject) => {
    if (debug)
      console.log(chalk.blue("[fileOperations][ensureDir]"), chalk.yellow(dir));
    fs.ensureDir(dir, (err) => (err ? reject(err) : resolve(null)));
  });

module.exports = ensureDir;
