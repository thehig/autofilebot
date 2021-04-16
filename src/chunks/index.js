const { exec, execAndLog } = require("./exec");
const prettifyFileList = require("./prettifyFileList");
const resolveSubstitutions = require("./resolveSubstitutions");
const runFilebot = require("./runFilebot");
const showNameIdentifier = require("./showNameIdentifier");
const takeOwnership = require("./takeOwnership");
const postProcess = require("./postProcess");
const walk = require("./walk");
const ensureDir = require("./ensureDir");
const isVideo = require("./isVideo");
const isIgnored = require("./isIgnored");
const getVideos = require("./getVideos");
const moveFiles = require("./moveFiles");
const { appendToLog, cleanedAppendToLog } = require("./appendToLog");

const modules = {
  cleanedAppendToLog,
  exec,
  execAndLog,
  prettifyFileList,
  resolveSubstitutions,
  runFilebot,
  showNameIdentifier,
  takeOwnership,
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
