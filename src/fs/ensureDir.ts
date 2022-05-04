import fs from "fs-extra";
import chalk from "chalk";

import { Debuglog } from "../wrap/log";

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

 /**
 * Ensures a collection of directories exist by creating them if necessary
 *
 * @param {string[]} directories File paths to check
 */
export const ensureDirs = (directories: string[]): Promise<void[]> =>
  Promise.all(directories.filter(onlyUnique).map(ensureDir));
