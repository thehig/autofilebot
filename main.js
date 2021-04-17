// @ts-ignore
const manifest = require("./package.json");

const chalk = require("chalk");

console.log(chalk.magenta(`=====${manifest.name} v${manifest.version}=====`));

const config = require("config");

const tempDir = config.get("temp");
const toDir = config.get("to");

const { getVideos } = require("./src/getVideos");
const { ensureDir } = require("./src/ensureDir");
const { moveFiles } = require("./src/moveFiles");
const { runFilebot } = require("./src/runFilebot");
const { takeOwnership } = require("./src/takeOwnership");
const { postProcess } = require("./src/postProcess");

const main = (fromDir) =>
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

const managedMain = (fromDir) =>
  main(fromDir)
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

module.exports = managedMain;
