// @ts-ignore
import chalk from "chalk";

import { getVideos } from "./getVideos";
import { ensureDir } from "./fs/ensureDir";
import { moveFiles } from "./fs/moveFiles";
import { runFilebot } from "./exec/runFilebot";
import { takeOwnership } from "./fs/takeOwnership";
import { postProcess } from "./postProcess";

export const Main = (fromDir: string, tempDir: string, toDir: string) =>
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

export default Main;
