import path from "path";
import chalk from "chalk";

import { getVideos } from "./getVideos";
import { ensureDirs } from "./ensureDir";
import { showNameIdentifier } from "./showNameIdentifier";
import { moveFile } from "./moveFiles";

export const postProcess = (fromDir: string, toDir: string) =>
  new Promise((resolve, reject) => {
    if (!fromDir || !toDir)
      return reject(new Error("Required parameter is missing"));

    return getVideos(fromDir)
      .then((files) => files.map(showNameIdentifier))
      .then((files) =>
        ensureDirs(files.map((f) => path.join(toDir, f.show))).then(() => files)
      )
      .then((files) =>
        Promise.all(
          files.map(({ show, path: { filepath } }) =>
            moveFile(path.join(toDir, show), filepath).catch((err) => {
              console.log(
                chalk.red(`[postProcess][error: ${err.message}]`),
                chalk.yellow(path.basename(filepath))
              );
            })
          )
        ).then(() => resolve(null))
      );
  });
