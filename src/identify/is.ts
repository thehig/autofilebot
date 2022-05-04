import config from "config";
const ignorePatterns: string[] = config.get("ignorePatterns");
const videoExtensions: string[] = config.get("videoExtensions");

export const ignored = (filename: string) =>
  ignorePatterns.some((pattern) => new RegExp(pattern, "i").test(filename));

export const video = (filename: string) =>
  videoExtensions.some((ext) => filename.endsWith(ext));
