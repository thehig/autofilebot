const {
  getVideosInFromDir,
  moveFilesFromFromDirToTempDir,
  runFilebotOnTempDir,
  getVideosInTempDir
} = require('./chunks');

getVideosInFromDir()
  .then(moveFilesFromFromDirToTempDir)
  .then(runFilebotOnTempDir)
  .then(getVideosInTempDir)
  .then(
    // Output any trailing responses
    msg =>
      msg &&
      console.log(
        chalk.red(`Trailing response: ${JSON.stringify(msg, null, 4)}`)
      )
  )
  .catch(err => console.error(chalk.red(err)));
