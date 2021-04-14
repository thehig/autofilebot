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
const walk = require("./walk");
const ensureDir = require("./ensureDir");
const isVideo = require("./isVideo");
const isIgnored = require("./isIgnored");
const getVideos = require("./getVideos");
const moveFiles = require("./moveFiles");
const appendToLog = require("./appendToLog");

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
  walk,
  ensureDir,
  isVideo,
  isIgnored,
  getVideos,
  moveFiles,
  appendToLog,
};

module.exports = modules;
