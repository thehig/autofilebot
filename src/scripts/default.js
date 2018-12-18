const chalk = require("chalk");

const {
  getVideosInFromDir,
  moveFilesFromFromDirToTempDir,
  runFilebotOnTempDir,
  takeOwnershipOfTempDir,
  moveFilesFromTempDirToToDir
} = require("../chunks");

/**
 * Get all the videos and put them in the temp dir
 */
const gather = () => getVideosInFromDir().then(moveFilesFromFromDirToTempDir);

/**
 * Assume all files in temp dir are TV, filebot and take ownership
 */
const filebot = () => runFilebotOnTempDir().then(takeOwnershipOfTempDir);

/**
 * Assume all files in temp dir are TV, move them to destination dir subfolders
 */
const putVideos = () => moveFilesFromTempDirToToDir();

/**
 * Do all of the above
 */
const doItAll = () => gather().then(filebot).then(putVideos);


/**
 * ACTUAL TASK THAT GETS INVOKED
 */
const task = doItAll;

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
