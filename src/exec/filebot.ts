import chalk from "chalk";
import config from "config";

import { exec } from "./exec";

import { Infolog } from "../wrap/log";
import { cleanedAppendToLog } from "../wrap/append";

import { filebotParser } from "../identify/filebot";

const filebotCommand: string = config.get("filebotCommand");

export const runFilebot = (directory: string) =>
  Infolog(chalk.cyan("[runFilebot]"), chalk.yellow(directory)).then(() =>
    exec(filebotCommand, { directory })
      .then((execResult) =>
        filebotParser(execResult, false).then((text) =>
          cleanedAppendToLog("OK", directory, text)
        )
      )
      .catch((execResult) =>
        filebotParser(execResult, true)
          .then((text) => cleanedAppendToLog("ERROR", directory, text))
          .then(() => {
            throw new Error(execResult.message);
          })
      )
  );
