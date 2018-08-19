const chalk = require("chalk");
const config = require("config");

const { exec } = require("./exec");
const {
  ensureDir,
  getVideos,
  moveFiles,
  appendToLog
} = require("./fileOperations");

const postProcess = require("./postProcessing");

// #region Config

const debug = config.get("debug");
const showConfig = config.get("showConfig");

const fromDir = config.get("from");
const tempDir = config.get("temp");
const toDir = config.get("to");
const logFile = config.get("log");

const filebotCommand = config.get("filebotCommand");
const takeOwnershipCommand = config.get("takeOwnershipCommand");

if (showConfig)
  console.log(`
=== config ===
${JSON.stringify(config.util.getConfigSources(), null, 4)}
==============
`);

// #endregion

const cleanedAppendToLog = (...params) => {
  // Replace the tempDir in output with '.'
  //    Done twice to account for either \ or / in the 'output' body
  const backslashDir = new RegExp(tempDir.replace(/\//g, "\\"), "g");
  const forwardslashDir = new RegExp(tempDir.replace(/\\/g, "/"), "g");

  return appendToLog(
    tempDir,
    logFile,
    params
      .map(p => (typeof p === "object" ? JSON.stringify(p) : p.toString()))
      .join("\n")
      .replace(backslashDir, ".")
      .replace(forwardslashDir, ".")
  );
};

// Write success output to log
const execAndLog = (...params) =>
  exec(...params)
    .then(log => cleanedAppendToLog("OK", ...params, log.stdout))
    // Write error output to log
    .catch(log =>
      cleanedAppendToLog("ERROR", ...params, log.stderr).then(
        // Rethrow the error
        () => {
          throw new Error(log.stderr);
        }
      )
    );

const runFilebot = directory => execAndLog(filebotCommand, { directory });
const takeOwnership = directory =>
  execAndLog(takeOwnershipCommand, {
    directory: directory.replace(/\//g, "\\")
  });

const prettifyFileList = filenames =>
  filenames
    .map(f => "\n\t* " + chalk.green(f.substring(f.lastIndexOf("\\") + 1)))
    .join("");

const getVideosInFromDir = () =>
  getVideos(fromDir).then(filenames => {
    if (!filenames.length) {
      // Handle no files
      throw new Error("No matching files found in " + fromDir);
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
const runFilebotOnTempDir = () => runFilebot(tempDir);
const takeOwnershipOfTempDir = () => takeOwnership(tempDir);

const moveFilesFromTempDirToToDir = () => {
  return postProcess(tempDir, toDir);
};

module.exports = {
  getVideosInFromDir,
  moveFilesFromFromDirToTempDir,
  runFilebotOnTempDir,
  takeOwnershipOfTempDir,
  moveFilesFromTempDirToToDir
};
