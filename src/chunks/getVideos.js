const isVideo = require("./isVideo");
const isIgnored = require("./isIgnored");
const walk = require("./walk");
const { dplog } = require("./promiseLog");
const chalk = require("chalk");

const getVideos = (directory) =>
  dplog(chalk.blue("[getVideos]"), chalk.yellow(directory)).then(() =>
    walk(directory, (filename) => isVideo(filename) && !isIgnored(filename))
  );

module.exports = getVideos;
