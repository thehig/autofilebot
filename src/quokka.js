console.log("quokka");
const id = require("./identifier");

// #region Mock FS
// const { walk } = require("./fileOperations");
// const config = require("config");
// const directory = config.get("to"); //?

// const mock = require("mock-fs");
// const fileStructure = {
//   [fromDir]: {
//     incomplete: {
//       // all ignored
//       "someFile.mp4": ""
//     }
//   }
// };

// mock(fileStructure);
// mock.restore();

// #endregion

const dataSubset = require("./quokka_data"); //.slice(1, 10);

const dictionary = {};

dataSubset.map(filename => {
  // Almost Human\Almost Human - 1x02 - Skin.mkv
  const [showName, ...episodes] = filename.split("\\");
  
  // Avoid any nested folders and just get the episode name
  const episode = episodes.pop();
  if(episodes.length) {
    // Nested Folders. Don't need to do anything now, but might be an issue in the future
    console.warn('Nested folder', episodes);
  }

  // Build a dictionary of { show: [ episode, episode, ... ] }
  if (!dictionary[showName]) {
    dictionary[showName] = [episode];
  } else {
    dictionary[showName].push(episode);
  }
});

const episodeCount = Object.keys(dictionary).map(showName => [
  showName,
  dictionary[showName].length
]);

for(let show in dictionary) {
  // console.log(show);
  const episodes = dictionary[show];

  for(let episode of episodes) {
    // console.log(episode);
    const showNameFromEpisode = id(episode);
    if(showNameFromEpisode.toLowerCase() !== show.toLowerCase()) {
      const issue = `${show} !== ${showNameFromEpisode}`;
      console.log(issue);
      break;
      // throw new Error(issue)
    }
  }
}
