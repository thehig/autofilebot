const chalk = require("chalk");

const {
  getVideosInFromDir,
  moveFilesFromFromDirToTempDir,
  runFilebotOnTempDir,
  takeOwnershipOfTempDir,
  moveFilesFromTempDirToToDir,
} = require("../chunks");

const main = () =>
  /**
   * Get all the videos and put them in the temp dir
   */
  getVideosInFromDir()
    .then(moveFilesFromFromDirToTempDir)

    /**
     * Assume all files in temp dir are TV, filebot and take ownership
     */
    .then(runFilebotOnTempDir)
    .then(takeOwnershipOfTempDir)

    /**
     * Assume all files in temp dir are TV, move them to destination dir subfolders
     */
    .then(moveFilesFromTempDirToToDir);

main()
  .then(
    // Output any trailing responses
    (msg) =>
      msg &&
      console.log(
        chalk.redBright(`Trailing response: ${JSON.stringify(msg, null, 4)}`)
      )
  )
  .catch((err) => console.error(chalk.red(err)));
