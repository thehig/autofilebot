// const debug = require("config").get("debug");
const debug = true;

const chalk = require("chalk");
const util = require("util");
const _exec = util.promisify(require("child_process").exec);

const { cleanedAppendToLog } = require("./appendToLog");
const { dplog } = require("./promiseLog");

// Iterate through the provided substitutions and attempt to string insert them
//     eg: .replace("$DIRECTORY$", directory)
const resolveSubstitutions = (inputCommand, substitutions = {}) => {
  const result = Object.keys(substitutions).reduce(
    (prev, next) =>
      prev.replace(`$${next.toUpperCase()}$`, substitutions[next]),
    inputCommand
  );
  // If the input has changed, but still contains $---$, re-resolve it to support chaining
  const test = inputCommand !== result && /\$(.*?)\$/.test(result);
  return test ? resolveSubstitutions(result, substitutions) : result;
};

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
  resolveSubstitutions,
  exec,
  execAndLog,
};
