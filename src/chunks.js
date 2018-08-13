const chalk = require("chalk");
const config = require("config");

const exec = require("./exec");
const {
  ensureDir,
  getVideos,
  moveFiles,
  appendToLog
} = require("./fileOperations");

// #region Config

const debug = config.get("debug");
const showConfig = config.get("showConfig");

const fromDir = config.get("from");
const tempDir = config.get("temp");
const toDir = config.get("to");
const logFile = config.get("log");

const filebotCommand = config.get("filebotCommand");

if (showConfig)
  console.log(`
=== config ===
${JSON.stringify(config.util.getConfigSources(), null, 4)}
==============
`);

// #endregion

const runFilebot = directory => exec(filebotCommand, { directory });

const prettifyFileList = filenames =>
  filenames
    .map(f => "\n\t* " + chalk.green(f.substring(f.lastIndexOf("\\") + 1)))
    .join("");

const getVideosInFromDir = () =>
  getVideos(fromDir).then(filenames => {
    if (!filenames.length) {
      // Handle no files
      throw new Error("No files found");
    }
    return filenames;
  });

// Move files "from/" => "temp/"
const moveFilesFromFromDirToTempDir = filenames => {
  // User-friendly output
  console.log(
    `Moving ${chalk.yellow(fromDir)} => ${chalk.yellow(tempDir)}`,
    prettifyFileList(filenames)
  );

  // Make sure "temp/" exists before moving the files
  return ensureDir(tempDir).then(() => moveFiles(tempDir, filenames));
};

// Run filebot on "temp/" and log the result
const runFilebotOnTempDir = () =>
  runFilebot(tempDir)
    // Write success output to log
    .then(log => appendToLog(tempDir, logFile, log.stdout))
    // Write error output to log
    .catch(log =>
      appendToLog(tempDir, logFile, log.stderr).then(
        // Rethrow the error
        () => {
          throw new Error(log.stderr);
        }
      )
    );

// Get renamed videos from "temp/"
const getVideosInTempDir = () =>
  getVideos(tempDir).then(filenames => {
    console.log(
      `Videos in ${chalk.yellow(tempDir)}`,
      prettifyFileList(filenames)
    );
  });

module.exports = {
  getVideosInFromDir,
  moveFilesFromFromDirToTempDir,
  runFilebotOnTempDir,
  getVideosInTempDir
};
