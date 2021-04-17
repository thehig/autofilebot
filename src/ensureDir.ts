import fs from "fs-extra";
import chalk from "chalk";

import { Debuglog } from "./log";

/**
 * Ensures directory exists by creating it if necessary
 *
 * @param {string} directory File path to check
 */
export const ensureDir = (directory: string): Promise<void> =>
  Debuglog(chalk.blue("[ensureDir]"), chalk.yellow(directory)).then(() =>
    fs.ensureDir(directory)
  );
