const { execAndLog } = require("./exec");

const filebotCommand = require("config").get("filebotCommand");

const runFilebot = (directory) => execAndLog(filebotCommand, { directory });

module.exports = runFilebot;
