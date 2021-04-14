const chalk = require("chalk");
const config = require("config");

const ensureDir = require("./ensureDir");
const moveFiles = require("./moveFiles");

const fromDir = config.get("from");
const tempDir = config.get("temp");

const prettifyFileList = require("./prettifyFileList");

// Move files "from/" => "temp/"
const moveFilesFromFromDirToTempDir = (filenames) => {
  // User-friendly output
  console.log(
    `Moving ${chalk.yellow(fromDir)} => ${chalk.yellow(tempDir)}`,
    prettifyFileList(filenames)
  );

  // Make sure "temp/" exists before moving the files
  return ensureDir(tempDir).then(() => moveFiles(tempDir, filenames));
};

module.exports = moveFilesFromFromDirToTempDir;
