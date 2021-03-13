const path = require("path");
const fs = require("fs-extra");

const debug = require("config").get("debug");
const chalk = require("chalk");

const { getVideos, ensureDir } = require("./fileOperations");
const id = require("./identifier");

const postProcess = (fromDir, toDir) =>
  new Promise((resolve, reject) => {
    if (!fromDir || !toDir)
      return reject(new Error("Required parameter is missing"));

    return getVideos(fromDir)
      .then(files => files.map(id))
      .then(files =>
        files.map(({ show, path: { filepath } }) =>
          ensureDir(path.join(toDir, show)).then(() => {
            const destination = path.join(toDir, show, path.basename(filepath));
            if (debug) {
              console.log(
                chalk.blue("[postProcessing]"),
                chalk.green("[Move]"),
                chalk.yellow(filepath),
                "to",
                chalk.yellow(destination)
              );
            }

            return fs.move(filepath, destination).catch(err => {
              console.log(
                chalk.blue("[postProcessing]"),
                chalk.red(`[error: ${err.message}]`),
                chalk.yellow(path.basename(filepath))
              );
            });
          })
        )
      )
      .then(promises => Promise.all(promises))
      .then(() => resolve(null));
  });

module.exports = postProcess;
