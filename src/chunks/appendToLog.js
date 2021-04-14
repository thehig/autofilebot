const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");

const config = require("config");
const debug = config.get("debug");

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
        chalk.blue("[fileOperations][appendToLog]"),
        chalk.yellow(destination),
        output
      );
    return resolve(
      fs.writeFile(destination, output, { flag: "a", encoding: "utf8" })
    );
  });

module.exports = appendToLog;
