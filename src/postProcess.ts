import path from "path";
import chalk from "chalk";

import { getVideos } from "./getVideos";
import { ensureDir } from "./ensureDir";
import { showNameIdentifier } from "./showNameIdentifier";
import { moveFile } from "./moveFiles";

export const postProcess = (fromDir: string, toDir: string) =>
  new Promise((resolve, reject) => {
    if (!fromDir || !toDir)
      return reject(new Error("Required parameter is missing"));

    return getVideos(fromDir)
      .then((files) => files.map(showNameIdentifier))
      .then((files) =>
        files.map(({ show, path: { filepath } }) =>
          ensureDir(path.join(toDir, show)).then(() => {
            const destination = path.join(toDir, show, path.basename(filepath));

            return moveFile(filepath, destination).catch((err) => {
              console.log(
                chalk.red(`[postProcess][error: ${err.message}]`),
                chalk.yellow(path.basename(filepath))
              );
            });
          })
        )
      )
      .then((promises) => Promise.all(promises))
      .then(() => resolve(null));
  });
