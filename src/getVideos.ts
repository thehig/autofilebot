import { isVideo } from "./isVideo";
import { isIgnored } from "./isIgnored";
import { walk } from "./walk";
import { Infolog } from "./log";
import chalk from "chalk";

export const getVideos = (directory) =>
  Infolog(chalk.blue("[getVideos]"), chalk.yellow(directory)).then(() =>
    walk(directory, (filename) => isVideo(filename) && !isIgnored(filename))
  );
