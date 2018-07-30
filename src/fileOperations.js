// Traverse directory recursively
const recursive = require("recursive-readdir");
// Perform file system ops (check dir exists, move files)
const fs = require("fs-extra");
// Determine folder, extension, directory
const path = require("path");

const isVideo = filename =>
c.videoExtensions.some(ext => filename.endsWith(ext));

const checkTempExists = dir => fs.ensureDir(dir);

const moveFilesTo = (destination, filenames) =>
filenames.map(filename =>
  fs.move(filename, path.join(destination, path.basename(filename)))
);

const recurseDirForVideos = (directory, ignorePatterns) =>
  new Promise((resolve, reject) => {
    if (c.debug) console.log(`Looking for files in ${directory}`);
    recursive(directory, ignorePatterns, function(err, files) {
      if (err) reject(err);
      const videoFiles = files.filter(isVideo);
      if (c.debug) console.log(`Found ${videoFiles.length} video(s)`);
      resolve(videoFiles);
      // videoFiles.length == 0
      //   ? reject("No video files found")
      //   : resolve(videoFiles);
    });
  });


  const appendToLog = (directory, log) =>
  new Promise((resolve, reject) => {
    const destination = path.join(directory, "autofilebot.js.log");
    const output = `
=======${new Date()}========
${JSON.stringify(log)}
`;
    const options = { flag: "a", encoding: "utf8" };

    if (c.debug)
      console.log(`
Appending logfile: ${destination}
${output}
`);

    resolve(fs.writeFile(destination, output, options));
  });
