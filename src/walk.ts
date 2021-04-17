import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import config from "config";
const debug = config.get("debug");

const _walk = function (dir, done) {
  var results = [];
  fs.readdir(dir, function (err, list) {
    if (err) return done(err);
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

export const walk = (directory, filter) =>
  new Promise((resolve, reject) =>
    _walk(directory, (err, results) => (err ? reject(err) : resolve(results)))
  )
    .then((results) => (filter ? results.filter(filter) : results))
    .then((results) => {
      if (debug)
        console.log(
          chalk.blue("[walk]"),
          chalk.yellow(directory),
          results && results.length ? "\n\t" + results : ""
        );
      return results;
    });
