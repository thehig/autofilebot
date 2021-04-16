const chalk = require("chalk");
const config = require("config");

const ensureDir = require("./ensureDir");
const moveFiles = require("./moveFiles");
const prettifyFileList = require("./prettifyFileList");

const fromDir = config.get("from");
const tempDir = config.get("temp");

// Move files "from/" => "temp/"
const moveFilesFromFromDirToTempDir = (filenames) => {
  if (!filenames || !filenames.length) return;

  // User-friendly output
  console.log(
    `Moving ${chalk.yellow(fromDir)} => ${chalk.yellow(tempDir)}`,
    prettifyFileList(filenames)
  );

  // Make sure "temp/" exists before moving the files
  return ensureDir(tempDir).then(() => moveFiles(tempDir, filenames));
};

module.exports = moveFilesFromFromDirToTempDir;
