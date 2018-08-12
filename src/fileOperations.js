const fs = require("fs-extra");
const path = require("path");

const config = require("config");
const debug = config.get("debug");

const ensureDir = dir =>
  new Promise((resolve, reject) => {
    fs.ensureDir(dir, err => (err ? reject(err) : resolve()));
  });

const _walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          _walk(file, function(err, res) {
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

const walk = (directory, filter) =>
  new Promise((resolve, reject) =>
    _walk(directory, (err, results) => (err ? reject(err) : resolve(results)))
  ).then(results => (filter ? results.filter(filter) : results));

const isVideo = filename =>
  config.get("videoExtensions").some(ext => filename.endsWith(ext));

const isIgnored = filename =>
  config
    .get("ignorePatterns")
    .some(pattern => new RegExp(pattern, "i").test(filename));

const getVideos = directory =>
  walk(directory, filename => isVideo(filename) && !isIgnored(filename));

const moveFiles = (destination, filenames) =>
  Promise.all(
    filenames.map(filename =>
      fs.move(filename, path.join(destination, path.basename(filename)))
    )
  );

// const appendToLog = (directory, log) =>
//   new Promise((resolve, reject) => {
//     const destination = path.join(directory, "autofilebot.js.log");
//     const output = `
// =======${new Date()}========
// ${JSON.stringify(log)}
// `;
//     const options = { flag: "a", encoding: "utf8" };

//     if (debug)
//       console.log(`
// Appending logfile: ${destination}
// ${output}
// `);

//     resolve(fs.writeFile(destination, output, options));
//   });

module.exports = {
  walk,
  ensureDir,
  isVideo,
  isIgnored,
  getVideos,
  moveFiles
};
