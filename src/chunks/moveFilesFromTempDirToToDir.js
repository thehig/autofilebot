const postProcess = require("./postProcess");

const config = require("config");
const tempDir = config.get("temp");
const toDir = config.get("to");

const moveFilesFromTempDirToToDir = () => {
  return postProcess(tempDir, toDir);
};

module.exports = moveFilesFromTempDirToToDir;
