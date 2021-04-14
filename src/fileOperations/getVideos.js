const walk = require("./walk");
const isVideo = require("./isVideo");
const isIgnored = require("./isIgnored");

const getVideos = (directory) =>
  walk(directory, (filename) => isVideo(filename) && !isIgnored(filename));

module.exports = getVideos;
