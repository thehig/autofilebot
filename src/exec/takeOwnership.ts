import { execAndLog } from "./exec";
import chalk from "chalk";
import { Infolog } from "../wrap/log";
import config from 'config';

const takeOwnershipCommand = <string>config.get("takeOwnershipCommand");

export const takeOwnership = (directory: string) =>
  Infolog(chalk.cyan("[takeOwnership]"), chalk.yellow(directory)).then(() =>
    execAndLog(takeOwnershipCommand, {
      directory: directory.replace(/\//g, "\\"),
    })
  );
