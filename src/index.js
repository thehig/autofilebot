const chalk = require("chalk");

const {
  getVideosInFromDir,
  moveFilesFromFromDirToTempDir,
  runFilebotOnTempDir,
  takeOwnershipOfTempDir,
  moveFilesFromTempDirToToDir
} = require("./chunks");

const defaultTask = () =>
  getVideosInFromDir()
    .then(moveFilesFromFromDirToTempDir)
    .then(runFilebotOnTempDir)
    .then(takeOwnershipOfTempDir)
    .then(moveFilesFromTempDirToToDir);

const repairTask = () =>
  getVideosInTempDir()
    .then(runFilebotOnTempDir)
    .then(takeOwnershipOfTempDir)
    .then(getVideosInTempDir);

const task = defaultTask;

task()
  .then(
    // Output any trailing responses
    msg =>
      msg &&
      console.log(
        chalk.redBright(`Trailing response: ${JSON.stringify(msg, null, 4)}`)
      )
  )
  .catch(err => console.error(chalk.red(err)));
