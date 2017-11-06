// Traverse directory recursively
const recursive = require("recursive-readdir");
// Perform file system ops (check dir exists, move files)
const fs = require("fs-extra");
// Determine folder, extension, directory
const path = require("path");

// Execute child process
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const c = {
  debug: true,
  from: "D:/Unsorted Torrents/2017-torrents/",
  temp: "D:/Sorted Torrents/temp",
  to: "D:/Sorted Torrents/TV/",
  videoExtensions: ["mkv", "avi", "mp4"],
  // videoExtensions: ["txt"],
  ignorePatterns: ["RARBG.mp4", "*sample*", "*incomplete*"],
  filebotCommand: 'filebot -rename "$PATTERN$" --db TheTVDB -non-strict'
};

const isVideo = filename =>
  c.videoExtensions.some(ext => filename.endsWith(ext));

const checkTempExists = dir => fs.ensureDir(dir);

const moveFilesTo = (destination, filenames) =>
  filenames.map(filename =>
    fs.move(filename, path.join(destination, path.basename(filename)))
  );

const runFilebot = directory =>
  new Promise((resolve, reject) => {
    const filebotCommand = c.filebotCommand.replace("$PATTERN$", directory);
    if (c.debug) console.log(`Running filebot: ${filebotCommand}`);
    resolve(exec(filebotCommand));
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

const getShowName = filename => new Promise((resolve, reject)=>{
  // Example inputs (folder trimmed)
  // .../Brooklyn Nine-Nine - 5x05 - Bad Beat.mp4
  // .../Cleverman - 2x06 - Borrowed Time.mp4
  // .../DC's Legends of Tomorrow - 3x04 - Phone Home.mkv
  // .../Last Week Tonight with John Oliver - 4x28 - Episode 117.mkv
  // .../Scorpion - 4x06 - Queen Scary.mkv
  // .../The Flash (2014) - 4x04 - Elongated Journey Into Night.mkv
  // .../Travelers (2016) - 2x03 - Jacob.mkv
  
  // Separate at the episode number
  //  Some numbers, an 'x', some numbers
  const episodeMatch = /(\d+)?[xXeE](\d+)/.exec(filename);
  if(!episodeMatch) reject(new Error('Unable to detect show episode ' + filename));

  // Remove the folder (c.temp) and everything from the - before the episode number
  const showName = filename.substring(c.temp.length + 1, episodeMatch.index - 2).trim();
  if(c.debug) console.log(`Show Name: ${showName}`);

  // Remove year brackets if present
  // const yearMatch = /\d+/.exec(showName);
  // if(!yearMatch) resolve(showName);

  if(c.debug) console.log(`Has Year: ${showName}`);
  resolve(showName);
});

const createShowDictionary = filenames => filenames.reduce((prev, next) => { prev[next] = true; return prev; }, {});

checkTempExists(c.temp)
  .then(() => recurseDirForVideos(c.from, c.ignorePatterns))
  .then(filenames => {
    if (c.debug) console.log(`Moving ${filenames} to ${c.temp}`);
    return Promise.all(moveFilesTo(c.temp, filenames));
  })
  .then(() => runFilebot(c.temp))
  .then(log => appendToLog(c.temp, log))
  .then(() => recurseDirForVideos(c.temp, c.ignorePatterns))
  .then(files => Promise.all(files.map(f => getShowName(f))))
  .then(showNames => createShowDictionary(showNames))
  .then(msg => console.log(`Output: ${JSON.stringify(msg, null, 4)}`))
  // .then(msg => console.log(`Output: ${msg}`))
  .catch(err => console.log(`Error: ${err}`));
