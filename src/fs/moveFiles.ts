import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { Infolog } from "../wrap/log";

export const moveFile = (destination: string, filename: string) =>
  Infolog(
    chalk.cyan("[move]"),
    chalk.yellow(filename),
    chalk.cyan("to"),
    chalk.yellow(path.join(destination, path.basename(filename)))
  )
    .then(() =>
      fs.move(filename, path.join(destination, path.basename(filename)))
    )
    .catch((err) => {
      // Add relevant information to the outgoing error
      throw new Error(
        `${err} source: ${filename} dest: ${path.join(
          destination,
          path.basename(filename)
        )})`
      );
    });

export const moveFiles = (destination: string, filenames: string[]) =>
  Promise.all(filenames.map((filename) => moveFile(destination, filename)));
