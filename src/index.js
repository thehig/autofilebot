
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
