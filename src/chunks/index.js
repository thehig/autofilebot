const cleanedAppendToLog = require("./cleanedAppendToLog");
const exec = require("./exec");
const execAndLog = require("./execAndLog");
const getVideosInFromDir = require("./getVideosInFromDir");
const moveFilesFromFromDirToTempDir = require("./moveFilesFromFromDirToTempDir");
const moveFilesFromTempDirToToDir = require("./moveFilesFromTempDirToToDir");
const prettifyFileList = require("./prettifyFileList");
const resolveSubstitutions = require("./resolveSubstitutions");
const runFilebot = require("./runFilebot");
const runFilebotOnTempDir = require("./runFilebotOnTempDir");
const showNameIdentifier = require("./showNameIdentifier");
const takeOwnership = require("./takeOwnership");
const takeOwnershipOfTempDir = require("./takeOwnershipOfTempDir");
const postProcess = require("./postProcess");

const modules = {
  cleanedAppendToLog,
  exec,
  execAndLog,
  getVideosInFromDir,
  moveFilesFromFromDirToTempDir,
  moveFilesFromTempDirToToDir,
  prettifyFileList,
  resolveSubstitutions,
  runFilebot,
  runFilebotOnTempDir,
  showNameIdentifier,
  takeOwnership,
  takeOwnershipOfTempDir,
  postProcess,
};

module.exports = modules;
