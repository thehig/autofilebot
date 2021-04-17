// @ts-ignore
import chalk from "chalk";
import config from "config";

import { getVideos } from "./src/getVideos";
import { ensureDir } from "./src/ensureDir";
import { moveFiles } from "./src/moveFiles";
import { runFilebot } from "./src/runFilebot";
import { takeOwnership } from "./src/takeOwnership";
import { postProcess } from "./src/postProcess";

const manifest = require("./package.json");
console.log(chalk.magenta(`=====${manifest.name} v${manifest.version}=====`));

const tempDir = config.get("temp");
const toDir = config.get("to");

export const main = (fromDir) =>
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

export const managedMain = (fromDir) =>
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

export default managedMain;
