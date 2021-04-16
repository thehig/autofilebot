const getVideos = require("./getVideos");

const config = require("config");
const fromDir = config.get("from");

const getVideosInFromDir = () => getVideos(fromDir);

module.exports = getVideosInFromDir;
