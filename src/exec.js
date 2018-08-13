const config = require("config");
const debug = config.get("debug");

const util = require("util");
const exec = util.promisify(require("child_process").exec);

module.exports = (inputCommand, substitutions = {}) =>
  new Promise(resolve => {
    // Iterate through the provided substitutions and attempt to string insert them
    //     eg: .replace("$DIRECTORY$", directory)
    let command = Object.keys(substitutions).reduce(
      (prev, next) =>
        prev.replace(`$${next.toUpperCase()}$`, substitutions[next]),
      inputCommand
    );

    if (debug) console.log(`Running command: ${command}`);
    resolve(exec(command));
  });