const fs = require("fs-extra");
const chalk = require("chalk");

const { Debuglog } = require("./log");

const ensureDir = (dir) =>
  Debuglog(chalk.blue("[ensureDir]"), chalk.yellow(dir)).then(() =>
    fs.ensureDir(dir)
  );

module.exports = { ensureDir };
