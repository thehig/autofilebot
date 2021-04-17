import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import config from "config";
const debug = config.get("debug");

const _walk = function (
  dir: string,
  done: (err: any, files: string[]) => unknown
) {
  var results: string[] = [];
  fs.readdir(dir, function (err, list) {
    if (err) return done(err, []);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function (file) {
      file = path.resolve(dir, file);
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          _walk(file, function (err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

export const walk = (
  directory: string,
  filter?: (filename: string) => boolean
) =>
  new Promise((resolve, reject) =>
    _walk(directory, (err, results) => (err ? reject(err) : resolve(results)))
  )
    .then((results) => (filter ? (<string[]>results).filter(filter) : results))
    .then((results): string[] => {
      if (debug)
        console.log(
          chalk.blue("[walk]"),
          chalk.yellow(directory),
          results && (<string[]>results).length ? "\n\t" + results : ""
        );
      return <string[]>results;
    });
