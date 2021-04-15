const { execAndLog } = require("./exec");

const takeOwnershipCommand = require("config").get("takeOwnershipCommand");

const takeOwnership = (directory) =>
  execAndLog(takeOwnershipCommand, {
    directory: directory.replace(/\//g, "\\"),
  });

module.exports = takeOwnership;
