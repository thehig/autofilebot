const chalk = require("chalk");

const {
  runFilebotOnTempDir,
  moveFilesFromTempDirToToDir,
} = require("../chunks");

const repairTask = () =>
  runFilebotOnTempDir().then(moveFilesFromTempDirToToDir);

const task = repairTask;

task()
  .then(
    // Output any trailing responses
    (msg) =>
      msg &&
      console.log(
        chalk.redBright(`Trailing response: ${JSON.stringify(msg, null, 4)}`)
      )
  )
  .catch((err) => console.error(chalk.red(err)));
