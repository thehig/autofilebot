const { isVideo } = require("./isVideo");
const { isIgnored } = require("./isIgnored");
const { walk } = require("./walk");
const { plog } = require("./promiseLog");
const chalk = require("chalk");

const getVideos = (directory) =>
  plog(chalk.blue("[getVideos]"), chalk.yellow(directory)).then(() =>
    walk(directory, (filename) => isVideo(filename) && !isIgnored(filename))
  );

module.exports = { getVideos };
