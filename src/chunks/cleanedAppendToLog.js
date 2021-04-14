const config = require("config");

const appendToLog = require("./appendToLog");

// #region Config
const tempDir = config.get("temp");
const logFile = config.get("log");
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

module.exports = cleanedAppendToLog;
