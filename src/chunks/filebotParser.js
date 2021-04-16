const chalk = require("chalk");
const debug = require("config").get("debug");

const debugLog = (execResult, isError) => {
  const message = execResult.message;
  const killed = execResult.killed;
  const code = execResult.code;
  const signal = execResult.signal;
  const cmd = execResult.cmd;
  const stdout = execResult.stdout;
  const stderr = execResult.stderr;

  const color = isError ? chalk.red : chalk.blue;

  cmd && console.log(color("[filebotParser][cmd]"), cmd);
  message && console.log(color("[filebotParser][message]"), message.trim());
  killed && console.log(color("[filebotParser][killed]"), killed);
  code && console.log(color("[filebotParser][code]"), code);
  signal && console.log(color("[filebotParser][signal]"), signal);

  stdout &&
    console.log(
      stdout
        .trim()
        .split("\n")
        .map((t) => color("[filebotParser][stdout] ") + t)
        .join("\n")
    );

  stderr &&
    console.log(
      stderr
        .trim()
        .split("\n")
        .map((t) => chalk.red("[filebotParser][stderr] ") + t)
        .join("\n")
    );
};

const filebotParser = (execResult, isError) =>
  new Promise((resolve, reject) => {
    if (!execResult) resolve("");
    if (debug) debugLog(execResult, isError);

    if (isError) {
      // The result is an error
      // eg:
      //    Rename episodes using [TheTVDB] with [Airdate]
      //    No media files: [E:\Media\Temp\autofilebot.log]
      //    Failure (�_�)??
      return resolve(execResult.message);
    }

    return resolve(execResult.stdout);
  });

module.exports = filebotParser;
