import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { Debuglog } from "../wrap/log";

/**
 * Recursively traverse dir for files
 *
 * @param {string} directory Directory to traverse
 * @param {(err: any, files: string[]) => unknown} done Callback with file names
 */
const _walk = function (
  directory: string,
  done: (err: any, files: string[]) => unknown
) {
  // Placeholder to contain file list
  var results: string[] = [];
  fs.readdir(directory, function (err, list: string[]) {
    // Error => Callback with error
    if (err) return done(err, results);
    var pending = list.length;
    // None pending => Callback with results
    if (!pending) return done(null, results);

    // For each found path in @directory
    list.forEach(function (_found_path) {
      const found_path = path.resolve(directory, _found_path);
      // Get information about the @found_path which could be a directory
      fs.stat(found_path, function (_err, stat) {
        if (stat && stat.isDirectory()) {
          // Traverse into directory
          _walk(found_path, function (_err, res) {
            // Combine directory results with previous results
            results = results.concat(res);
            // None pending => Callback with results
            if (!--pending) done(null, results);
          });
        } else {
          // Add file to previous results
          results.push(found_path);
          // None pending => Callback with results
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

/**
 * Walk @directory and collect all files, or all files that match @filter if provided
 *
 * @param {string} directory Directory to traverse
 * @param {(filename: string) => boolean} [filter] Should this file be included in the results?
 */
export const walk = (
  directory: string,
  filter?: (filename: string) => boolean
): Promise<string[]> =>
  new Promise((resolve, reject) =>
    _walk(directory, (err, results) => (err ? reject(err) : resolve(results)))
  )
    .then((results) => (filter ? (<string[]>results).filter(filter) : results))
    .then((results) =>
      Debuglog(
        chalk.cyan("[walk]"),
        chalk.yellow(directory),
        chalk.cyan(`[${(<string[]>results).length}]`),
        results && (<string[]>results).length
          ? "\n\t" +
              chalk.cyan("[+] ") +
              (<string[]>results).join("\n\t" + chalk.cyan("[+] "))
          : ""
      ).then(() => <string[]>results)
    );
