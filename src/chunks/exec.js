// const debug = require("config").get("debug");
const debug = true;

const chalk = require("chalk");
const util = require("util");
const _exec = util.promisify(require("child_process").exec);

const resolveSubstitutions = require("./resolveSubstitutions");
const { cleanedAppendToLog } = require("./appendToLog");
const { dplog } = require("./promiseLog");

const exec = (inputCommand, substitutions) =>
  dplog(
    chalk.blue("[exec][Preparing]"),
    chalk.yellow(inputCommand),
    chalk.blue("with"),
    substitutions
  ).then(() => _exec(resolveSubstitutions(inputCommand, substitutions)));

// Write success output to log
const execAndLog = (...params) =>
  exec(...params)
    .then((execResult) =>
      cleanedAppendToLog("OK", ...params, execResult.stdout)
    )
    .catch((execResult) =>
      cleanedAppendToLog("ERROR", ...params, execResult.message).then(() => {
        throw new Error(execResult.message);
      })
    );

module.exports = {
  exec,
  execAndLog,
};
