const config = require("config");
const debug = config.get("debug");
const chalk = require("chalk");
const util = require("util");
const _exec = util.promisify(require("child_process").exec);

const resolveSubstitutions = require("./resolveSubstitutions");
const { cleanedAppendToLog } = require("./appendToLog");

const exec = (inputCommand, substitutions) =>
  new Promise((resolve) => {
    if (debug)
      console.log(chalk.blue("[exec][Preparing]"), inputCommand, substitutions);
    const command = resolveSubstitutions(inputCommand, substitutions);
    if (debug) console.log(chalk.blue("[exec][Executing]"), command);
    resolve(_exec(command));
  });

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

module.exports = {
  exec,
  execAndLog,
};
