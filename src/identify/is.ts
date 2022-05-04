import config from "config";

const ignorePatterns: string[] = config.get("ignorePatterns");
export const ignored = (filename: string): boolean =>
ignorePatterns.some((pattern) => new RegExp(pattern, "i").test(filename));

const videoExtensions: string[] = config.get("videoExtensions");
export const video = (filename: string): boolean =>
  videoExtensions.some((ext) => filename.endsWith(ext));
