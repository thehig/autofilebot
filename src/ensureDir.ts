import fs from "fs-extra";
import chalk from "chalk";

import { Debuglog } from "./log";

export const ensureDir = (dir: string) =>
  Debuglog(chalk.blue("[ensureDir]"), chalk.yellow(dir)).then(() =>
    fs.ensureDir(dir)
  );
