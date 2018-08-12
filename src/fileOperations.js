const fs = require("fs");
const path = require("path");

const config = require("config");
const debug = config.get("debug");

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

// const isVideo = filename =>
//   config.get("videoExtensions").some(ext => filename.endsWith(ext));

// const checkTempExists = dir => fs.ensureDir(dir);

// const moveFilesTo = (destination, filenames) =>
//   filenames.map(filename =>
//     fs.move(filename, path.join(destination, path.basename(filename)))
//   );

// const recursiveWalk = directory =>
//   new Promise((resolve, reject) => {
//     const fileList = [];
//     fs.readdir(directory, (err, files) => {
//       if (!files) return;

//       files.map(file => {
//         console.log(JSON.stringify(file));
//         const fullName = `${directory}/${file}`;

//         fs.lstatSync(fullName).isDirectory(); //?
//         // console.log('stat', fullName, file);
//         // fs.statSync(fullName); //?
//         // console.log(fullName);
//         // fs.stat(fullName, (err, thing) => {
//         //   console.log("err, thing", err, thing);
//         // });
//         // if (fs.statSync(`${directory}/${file}`).isDirectory()) {
//         //   console.log("directory:", file);
//         // }
//       });
//     });
//     reject();
//   });

// const recurseDirForVideos = directory =>
//   new Promise((resolve, reject) => {
//     if (debug) console.log(`Looking for files in ${directory}`);
//     glob(`${directory}/**/*.*`, function(err, files) {
//       if (err) reject(err);
//       const videoFiles = files.filter(isVideo);
//       if (debug) console.log(`Found ${videoFiles.length} video(s)`);
//       resolve(videoFiles);
//       // videoFiles.length == 0
//       //   ? reject("No video files found")
//       //   : resolve(videoFiles);
//     });
//   });

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
  walk
};
