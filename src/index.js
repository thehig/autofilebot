const config = require("config");
const debug = config.get("debug");
const runFilebot = require("./filebot");

const {
  checkTempExists,
  moveFilesTo,
  recurseDirForVideos,
  appendToLog
} = require("./fileOperations");

if (config.get('showConfig'))
  console.log(`
=== config ===
${JSON.stringify(config.util.getConfigSources(), null, 4)}
==============
`);

checkTempExists(config.get("temp"))
  .then(() =>
    recurseDirForVideos(config.get("from"), config.get("ignorePatterns"))
  )
  // .then(filenames => {
  //   if (config.get("debug"))
  //     console.log(`Moving ${filenames} to ${config.get("temp")}`);
  //   return Promise.all(moveFilesTo(config.get("temp"), filenames));
  // })
  // .then(() => runFilebot(config.get("temp")))
  // .then(log => appendToLog(config.get("temp"), log))
  // .then(() =>
  //   recurseDirForVideos(config.get("temp"), config.get("ignorePatterns"))
  // )
  // .then(files => Promise.all(files.map(f => getShowName(f))))
  // .then(showNames => createShowDictionary(showNames))
  .then(msg => console.log(`Output: ${JSON.stringify(msg, null, 4)}`))
  // .then(msg => console.log(`Output: ${msg}`))
  .catch(err => console.log(`Error: ${err}`));
