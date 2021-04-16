const fs = require("fs-extra");
const chalk = require("chalk");

const { dplog } = require("./promiseLog");

const ensureDir = (dir) =>
  dplog(chalk.blue("[ensureDir]"), chalk.yellow(dir)).then(() =>
    fs.ensureDir(dir)
  );

module.exports = { ensureDir };
