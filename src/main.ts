// @ts-ignore
import chalk from "chalk";
import config from "config";

import { getVideos } from "./getVideos";
import { ensureDir } from "./ensureDir";
import { moveFiles } from "./moveFiles";
import { runFilebot } from "./runFilebot";
import { takeOwnership } from "./takeOwnership";
import { postProcess } from "./postProcess";

const manifest = require("../package.json");
console.log(chalk.magenta(`=====${manifest.name} v${manifest.version}=====`));

const tempDir: string = config.get("temp");
const toDir: string = config.get("to");

export const main = (fromDir: string) =>
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

export const managedMain = (fromDir: string) =>
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
