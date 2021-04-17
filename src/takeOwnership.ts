import { execAndLog } from "./exec";
import chalk from "chalk";
import { Infolog } from "./log";

const takeOwnershipCommand = require("config").get("takeOwnershipCommand");

export const takeOwnership = (directory) =>
  Infolog(chalk.blue("[takeOwnership]"), chalk.yellow(directory)).then(() =>
    execAndLog(takeOwnershipCommand, {
      directory: directory.replace(/\//g, "\\"),
    })
  );
