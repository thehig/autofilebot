import { Infolog } from "./log";
import { exec } from "./exec";
import { cleanedAppendToLog } from "./appendToLog";
import { filebotParser } from "./filebotParser";
import chalk from "chalk";
import config from "config";
const filebotCommand = config.get("filebotCommand");

export const runFilebot = (directory) =>
  Infolog(chalk.blue("[runFilebot]"), chalk.yellow(directory)).then(() =>
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
