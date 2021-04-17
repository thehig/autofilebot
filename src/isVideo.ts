import config from "config";
const videoExtensions = config.get("videoExtensions");

export const isVideo = (filename) =>
  videoExtensions.some((ext) => filename.endsWith(ext));
