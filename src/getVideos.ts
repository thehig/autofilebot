import { video as isVideo, ignored as isIgnored } from "./identify/is";
import { walk } from "./fs/walk";
import { Infolog } from "./wrap/log";
import chalk from "chalk";

export const getVideos = (directory: string) =>
  Infolog(chalk.cyan("[getVideos]"), chalk.yellow(directory)).then(() =>
    walk(directory, (filename) => isVideo(filename) && !isIgnored(filename))
  );
