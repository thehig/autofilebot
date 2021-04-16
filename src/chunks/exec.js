// const debug = require("config").get("debug");
const debug = true;

const chalk = require("chalk");
const util = require("util");
const _exec = util.promisify(require("child_process").exec);

const resolveSubstitutions = require("./resolveSubstitutions");
const { cleanedAppendToLog } = require("./appendToLog");
const filebotParser = require("./filebotParser");
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
      filebotParser(execResult, false).then((text) =>
        cleanedAppendToLog("OK", ...params, text)
      )
    )
    .catch((execResult) =>
      filebotParser(execResult, true).then((text) =>
        cleanedAppendToLog("ERROR", ...params, text).then(() => {
          throw new Error(text);
        })
      )
    );

module.exports = {
  exec,
  execAndLog,
};
