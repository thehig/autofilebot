const { plog } = require("./promiseLog");
const { exec } = require("./exec");
const { cleanedAppendToLog } = require("./appendToLog");
const { filebotParser } = require("./filebotParser");
const chalk = require("chalk");
const filebotCommand = require("config").get("filebotCommand");

const runFilebot = (directory) =>
  plog(chalk.blue("[runFilebot]"), chalk.yellow(directory)).then(() =>
    exec(filebotCommand, { directory })
      .then((execResult) =>
        filebotParser(execResult, false).then((text) =>
          cleanedAppendToLog("OK", directory, text)
        )
      )
      .catch((execResult) =>
        filebotParser(execResult, true)
          .then((text) => cleanedAppendToLog("ERROR", directory, text))
          .then(() => {
            throw new Error(execResult.message);
          })
      )
  );

module.exports = { runFilebot };
