import chalk from "chalk";
import util from "util";
import child_process from "child_process";
const _exec = util.promisify(child_process.exec);

import { cleanedAppendToLog } from "./appendToLog";
import { Debuglog } from "./log";

// Iterate through the provided substitutions and attempt to string insert them
//     eg: .replace("$DIRECTORY$", directory)
export const resolveSubstitutions = (inputCommand, substitutions = {}) => {
  const result = Object.keys(substitutions).reduce(
    (prev, next) =>
      prev.replace(`$${next.toUpperCase()}$`, substitutions[next]),
    inputCommand
  );
  // If the input has changed, but still contains $---$, re-resolve it to support chaining
  const test = inputCommand !== result && /\$(.*?)\$/.test(result);
  return test ? resolveSubstitutions(result, substitutions) : result;
};

export const exec = (inputCommand, substitutions) =>
  Debuglog(
    chalk.blue("[exec][Preparing]"),
    chalk.yellow(inputCommand),
    chalk.blue("with"),
    substitutions
  ).then(() => _exec(resolveSubstitutions(inputCommand, substitutions)));

// Write success output to log
export const execAndLog = (inputCommand, substitutions) =>
  exec(inputCommand, substitutions)
    .then((execResult) =>
      cleanedAppendToLog("OK", inputCommand, substitutions, execResult.stdout)
    )
    .catch((execResult) =>
      cleanedAppendToLog(
        "ERROR",
        inputCommand,
        substitutions,
        execResult.message
      ).then(() => {
        throw new Error(execResult.message);
      })
    );
