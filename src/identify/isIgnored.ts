import config from "config";
const ignorePatterns: string[] = config.get("ignorePatterns");

export const isIgnored = (filename: string) =>
  ignorePatterns.some((pattern) => new RegExp(pattern, "i").test(filename));
