const { execAndLog } = require("./exec");
const chalk = require("chalk");
const { plog } = require("./promiseLog");

const takeOwnershipCommand = require("config").get("takeOwnershipCommand");

const takeOwnership = (directory) =>
  plog(chalk.blue("[takeOwnership]"), chalk.yellow(directory)).then(() =>
    execAndLog(takeOwnershipCommand, {
      directory: directory.replace(/\//g, "\\"),
    })
  );

module.exports = { takeOwnership };
