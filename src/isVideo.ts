import config from "config";
const videoExtensions: string[] = config.get("videoExtensions");

export const isVideo = (filename: string) =>
  videoExtensions.some((ext) => filename.endsWith(ext));
