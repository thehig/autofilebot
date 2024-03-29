import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

import config from "config";

const debug = config.get("debug");
const tempDir: string = config.get("temp");
const logFile: string = config.get("log");

 /**
 * Append `$contents` to the log file at `$directory/$filename`
 *
 * @param {string} directory Path to log file directory
 * @param {string} filename Filename for log file
 * @param {string} contents String to be appended to log file
 */
export const appendToLog = (
  directory: string,
  filename: string,
  contents: string
) =>
  new Promise((resolve, reject) => {
    if (!contents) return reject("Unable to append empty contents to log");

    const destination = path.join(directory, filename);

    let output = `
=======${new Date()}========

${contents}

`;
    if (debug)
      console.log(
        chalk.cyan("[appendToLog]"),
        chalk.yellow(destination),
        output
      );
    return resolve(
      fs.writeFile(destination, output, { flag: "a", encoding: "utf8" })
    );
  });


/**
 * Append a list of parameters to the `$$tempDir/$$logFile`
 *
 * @param {...unknown[]} params
 * @return {*} 
 */
export const cleanedAppendToLog = (...params: unknown[]) => {
  // Replace the tempDir in output with '.'
  //    Done twice to account for either \ or / in the 'output' body
  const backslashDir = new RegExp(tempDir.replace(/\//g, "\\"), "g");
  const forwardslashDir = new RegExp(tempDir.replace(/\\/g, "/"), "g");

  return appendToLog(
    tempDir,
    logFile,
    params
      .map((p) =>
        typeof p === "object" ? JSON.stringify(p) : (<object>p).toString()
      )
      .join("\n")
      .replace(backslashDir, ".")
      .replace(forwardslashDir, ".")
  );
};
