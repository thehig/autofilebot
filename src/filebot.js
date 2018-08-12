const config = require("config");
const debug = config.get("debug");

// Execute child process
const util = require("util");
const exec = util.promisify(require("child_process").exec);

module.exports /* const runFilebot */ = directory =>
  new Promise(resolve => {
    const filebotCommand = config
      .get("filebotCommand")
      .replace("$PATTERN$", directory);
    console.log(`Running filebot: ${filebotCommand}`);
    resolve(exec(filebotCommand));
  });
