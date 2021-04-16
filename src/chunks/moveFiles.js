const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const { plog } = require("./promiseLog");

const moveFiles = (destination, filenames) =>
  Promise.all(
    filenames.map((filename) =>
      plog(
        chalk.blue("[Move]"),
        chalk.yellow(filename),
        chalk.blue("to"),
        chalk.yellow(path.join(destination, path.basename(filename)))
      )
        .then(
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
        })
    )
  );

module.exports = moveFiles;
