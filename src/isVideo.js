const videoExtensions = require("config").get("videoExtensions");

const isVideo = (filename) =>
  videoExtensions.some((ext) => filename.endsWith(ext));

module.exports = { isVideo };
