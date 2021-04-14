const config = require("config");

const execAndLog = require("./execAndLog");
const filebotCommand = config.get("filebotCommand");
const runFilebot = (directory) => execAndLog(filebotCommand, { directory });

module.exports = runFilebot;
