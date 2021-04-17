import config from "config";
const ignorePatterns = config.get("ignorePatterns");

export const isIgnored = (filename) =>
  ignorePatterns.some((pattern) => new RegExp(pattern, "i").test(filename));
