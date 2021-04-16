const chalk = require("chalk");
const config = require("config");

const fromDir = config.get("from");
const tempDir = config.get("temp");
const toDir = config.get("to");

const {
  getVideos,
  ensureDir,
  moveFiles,
  runFilebot,
  takeOwnership,
  postProcess,
} = require("../chunks");

const main = () =>
  /**
   * Get all the videos and put them in the temp dir
   */
  getVideos(fromDir)
    .then((filenames) =>
      ensureDir(tempDir).then(() => moveFiles(tempDir, filenames))
    )

    /**
     * Assume all files in temp dir are TV, filebot and take ownership
     */
    .then(() => runFilebot(tempDir))
    .then(() => takeOwnership(tempDir))

    /**
     * Assume all files in temp dir are TV, move them to destination dir subfolders
     */
    .then(() => postProcess(tempDir, toDir));

main()
  .then(
    // Output any trailing responses
    (msg) =>
      msg &&
      console.log(
        chalk.redBright(`Trailing response: ${JSON.stringify(msg, null, 4)}`)
      )
  )
  .catch((err) => console.error(chalk.red(err)))
  .finally(() => {
    console.log("Press any key to exit");

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on("data", process.exit.bind(process, 0));
  });
