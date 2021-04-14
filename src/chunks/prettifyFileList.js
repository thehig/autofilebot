const chalk = require("chalk");

const prettifyFileList = (filenames) =>
  filenames
    .map((f) => "\n\t* " + chalk.green(f.substring(f.lastIndexOf("\\") + 1)))
    .join("");

module.exports = prettifyFileList;
