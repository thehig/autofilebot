const getVideos = require("./getVideos");
const fromDir = require("config").get("from");

const getVideosInFromDir = () =>
  getVideos(fromDir).then((filenames) => {
    if (!filenames.length) {
      // Handle no files
      throw new Error("No matching files found in " + fromDir);
    }
    return filenames;
  });

module.exports = getVideosInFromDir;
