import fs from "fs-extra";
import chalk from "chalk";

import { Debuglog } from "./log";

/**
 * Ensures directory exists by creating it if necessary
 *
 * @param {string} directory File path to check
 */
export const ensureDir = (directory: string): Promise<void> =>
  Debuglog(chalk.cyan("[ensureDir]"), chalk.yellow(directory)).then(() =>
    fs.ensureDir(directory)
  );

function onlyUnique(value: unknown, index: number, self: Array<unknown>) {
  return self.indexOf(value) === index;
}

export const ensureDirs = (directories: string[]): Promise<void[]> =>
  Promise.all(directories.filter(onlyUnique).map(ensureDir));
