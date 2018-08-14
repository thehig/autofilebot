console.log("quokka");
const config = require("config");
const { identifyFilename, transformFileName } = require("./identifier");
const { walk } = require("./fileOperations");
const walkPath = config.get("to"); //?

// #region Mock FS
// const { walk } = require("./fileOperations");
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

const buildDictionary = filenames => {
  const dictionary = {};

  filenames.map(filename => {
    const [show, episode] = identifyFilename(filename);
    if (!dictionary[show]) {
      dictionary[show] = [episode];
    } else {
      dictionary[show].push(episode);
    }
  });

  return dictionary;
};

const episodeCount = dict =>
  Object.keys(dict).map(show => [show, dict[show].length]);

const errorCheck = dictionary => {
  let issues = [];
  for (let show in dictionary) {
    // console.log(show);
    const episodes = dictionary[show];

    for (let episode of episodes) {
      // console.log(episode);
      const showNameFromEpisode = transformFileName(episode);
      if (showNameFromEpisode.toLowerCase() !== show.toLowerCase()) {
        const issue = `${show} !== ${showNameFromEpisode}`;
        issues.push(issue);
        break;
      }
    }
  }
  return issues;
};

const fileFilter = filename => filename.indexOf("desktop.ini") === -1;

walk(walkPath, fileFilter)
  .then(files => files.map(file => file.substring(walkPath.length)))
  .then(files => {
    return buildDictionary(files); //?
  })
  // .then(dictionary => {
  //   console.log("Episode Count", episodeCount(dictionary));
  //   return dictionary;
  // })
  .then(dictionary => {
    console.log("Errors", errorCheck(dictionary));
    return dictionary;
  });
// buildDictionary(require("./quokka_data")); //?
