const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");

const config = require("config");
const debug = config.get("debug");
const tempDir = config.get("temp");
const logFile = config.get("log");

const appendToLog = (directory, filename, contents) =>
  new Promise((resolve, reject) => {
    if (!contents) return reject("Unable to append empty contents to log");

    const destination = path.join(directory, filename);

    let output = `
=======${new Date()}========

${contents}

`;
    if (debug)
      console.log(
        chalk.blue("[appendToLog]"),
        chalk.yellow(destination),
        output
      );
    return resolve(
      fs.writeFile(destination, output, { flag: "a", encoding: "utf8" })
    );
  });

const cleanedAppendToLog = (...params) => {
  // Replace the tempDir in output with '.'
  //    Done twice to account for either \ or / in the 'output' body
  const backslashDir = new RegExp(tempDir.replace(/\//g, "\\"), "g");
  const forwardslashDir = new RegExp(tempDir.replace(/\\/g, "/"), "g");

  return appendToLog(
    tempDir,
    logFile,
    params
      .map((p) => (typeof p === "object" ? JSON.stringify(p) : p.toString()))
      .join("\n")
      .replace(backslashDir, ".")
      .replace(forwardslashDir, ".")
  );
};

module.exports = {
  cleanedAppendToLog,
  appendToLog,
};
