const config = require("config");

const execAndLog = require("./execAndLog");

const takeOwnershipCommand = config.get("takeOwnershipCommand");
const takeOwnership = (directory) =>
  execAndLog(takeOwnershipCommand, {
    directory: directory.replace(/\//g, "\\"),
  });

module.exports = takeOwnership;
