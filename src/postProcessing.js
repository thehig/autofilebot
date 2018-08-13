
// const getShowName = filename => new Promise((resolve, reject)=>{
//   // Example inputs (folder trimmed)
//   // .../Brooklyn Nine-Nine - 5x05 - Bad Beat.mp4
//   // .../Cleverman - 2x06 - Borrowed Time.mp4
//   // .../DC's Legends of Tomorrow - 3x04 - Phone Home.mkv
//   // .../Last Week Tonight with John Oliver - 4x28 - Episode 117.mkv
//   // .../Scorpion - 4x06 - Queen Scary.mkv
//   // .../The Flash (2014) - 4x04 - Elongated Journey Into Night.mkv
//   // .../Travelers (2016) - 2x03 - Jacob.mkv
  
//   // Separate at the episode number
//   //  Some numbers, an 'x', some numbers
//   const episodeMatch = /(\d+)?[xXeE](\d+)/.exec(filename);
//   if(!episodeMatch) reject(new Error('Unable to detect show episode ' + filename));

//   // Remove the folder (c.temp) and everything from the - before the episode number
//   const showName = filename.substring(c.temp.length + 1, episodeMatch.index - 2).trim();
//   if(c.debug) console.log(`Show Name: ${showName}`);

//   // Remove year brackets if present
//   // const yearMatch = /\d+/.exec(showName);
//   // if(!yearMatch) resolve(showName);

//   if(c.debug) console.log(`Has Year: ${showName}`);
//   resolve(showName);
// });

// const createShowDictionary = filenames => filenames.reduce((prev, next) => { prev[next] = true; return prev; }, {});
