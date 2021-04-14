const exec = require("./exec");
const cleanedAppendToLog = require("./cleanedAppendToLog");

// Write success output to log
const execAndLog = (...params) =>
  exec(...params)
    .then((log) => cleanedAppendToLog("OK", ...params, log.stdout))
    // Write error output to log
    .catch((log) =>
      cleanedAppendToLog("ERROR", ...params, log.stderr).then(
        // Rethrow the error
        () => {
          throw new Error(log.stderr);
        }
      )
    );

module.exports = execAndLog;
