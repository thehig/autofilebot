import { isVideo } from "./identify/isVideo";
import { isIgnored } from "./identify/isIgnored";
import { walk } from "./fs/walk";
import { Infolog } from "./wrap/log";
import chalk from "chalk";

export const getVideos = (directory: string) =>
  Infolog(chalk.cyan("[getVideos]"), chalk.yellow(directory)).then(() =>
    walk(directory, (filename) => isVideo(filename) && !isIgnored(filename))
  );
