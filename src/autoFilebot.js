// // Traverse directory recursively
// const recursive = require("recursive-readdir");
// // Perform file system ops (check dir exists, move files)
// const fs = require("fs-extra");
// // Determine folder, extension, directory
// const path = require("path");

// // Execute child process
// const util = require("util");
// const exec = util.promisify(require("child_process").exec);

// const c = require('config'); /*?*/

// const isVideo = filename =>
//   c.videoExtensions.some(ext => filename.endsWith(ext));

// const checkTempExists = dir => fs.ensureDir(dir);

// const moveFilesTo = (destination, filenames) =>
//   filenames.map(filename =>
//     fs.move(filename, path.join(destination, path.basename(filename)))
//   );

// const runFilebot = directory =>
//   new Promise((resolve, reject) => {
//     const filebotCommand = c.filebotCommand.replace("$PATTERN$", directory);
//     if (c.debug) console.log(`Running filebot: ${filebotCommand}`);
//     resolve(exec(filebotCommand));
//   });

// const appendToLog = (directory, log) =>
//   new Promise((resolve, reject) => {
//     const destination = path.join(directory, "autofilebot.js.log");
//     const output = `
// =======${new Date()}========
// ${JSON.stringify(log)}
// `;
//     const options = { flag: "a", encoding: "utf8" };

//     if (c.debug)
//       console.log(`
// Appending logfile: ${destination}
// ${output}
// `);

//     resolve(fs.writeFile(destination, output, options));
//   });

// const recurseDirForVideos = (directory, ignorePatterns) =>
//   new Promise((resolve, reject) => {
//     if (c.debug) console.log(`Looking for files in ${directory}`);
//     recursive(directory, ignorePatterns, function(err, files) {
//       if (err) reject(err);
//       const videoFiles = files.filter(isVideo);
//       if (c.debug) console.log(`Found ${videoFiles.length} video(s)`);
//       videoFiles.length == 0
//         ? reject("No video files found")
//         : resolve(videoFiles);
//     });
//   });

// // const getShowName = filename => new Promise((resolve, reject)=>{
// //   console.log(`getShowName: ${filename}`)
// // });

// checkTempExists(c.temp)
//   .then(() => recurseDirForVideos(c.from, c.ignorePatterns))
//   .then(filenames => {
//     if (c.debug) console.log(`Moving ${filenames} to ${c.temp}`);
//     return Promise.all(moveFilesTo(c.temp, filenames));
//   })
//   .then(() => runFilebot(c.temp))
//   .then(log => appendToLog(c.temp, log))
//   .then(() => recurseDirForVideos(c.temp, c.ignorePatterns))
//   .then(msg => console.log(`Output: ${msg}`))
//   .catch(err => console.log(`Error: ${err}`));

const checkTempExists = (services, config) => () =>
  new Promise((resolve, reject) => {
    // services.console.log('Services', services);
    // services.console.log('Config', config);
    setTimeout(()=>{
      return reject('Nope');
    }, 1000);
  });

module.exports = services => {
  if (!services) throw new Error("Services is required");
  return config => {
    if (!config) throw new Error("Config is required");
    return {
      services: () => services /*?*/,
      config: () => config /*?*/,
      checkTempExists: checkTempExists(services, config)
    };
  };
};
