const config = require("config");
const isVideo = (filename) =>
  config.get("videoExtensions").some((ext) => filename.endsWith(ext));

module.exports = isVideo;
