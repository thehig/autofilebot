const config = require("config");
const debug = config.get("debug");
const chalk = require("chalk");

const util = require("util");
const _exec = util.promisify(require("child_process").exec);

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
  new Promise(resolve => {
    if (debug) console.log(chalk.blue('[exec][Preparing]'), inputCommand, substitutions);
    const command = resolveSubstitutions(inputCommand, substitutions);
    if (debug) console.log(chalk.blue('[exec][Executing]'), command);
    resolve(_exec(command));
  });

module.exports = {
  resolveSubstitutions,
  exec
};
