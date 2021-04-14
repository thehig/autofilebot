// @ts-nocheck
const walkPath = require("config").get("to");

const id = require("./identifier");
const { walk } = require("./fileOperations");

const buildDictionary = filepaths => {
  const dictionary = {};

  filepaths.map(filepath => {
    const details = id(filepath);
    const { show } = details;
    if (!dictionary[show]) {
      dictionary[show] = [details];
    } else {
      dictionary[show].push(details);
    }
  });

  return dictionary;
};

const episodeCount = dict =>
  Object.keys(dict).map(show => [show, dict[show].length]);

const errorCheck = dictionary => {
  let issues = [];
  for (let show in dictionary) {
    const episodes = dictionary[show];

    for (let episode of episodes) {
      // Destructure the episode that was returned from the identifier
      const {
        show,
        ep,
        title,
        path: { parent, filepath, unprocessed }
      } = episode;
      const errors = {
        filepath,
        issues: []
      };

      // Check for missing elements
      !show && errors.issues.push(`Missing show`);
      !ep && errors.issues.push(`Missing ep`);
      !title && errors.issues.push(`Missing title`);

      // Check for unprocessed folders
      //   (Converts "\" into "/", and appends "/")
      if (unprocessed.replace(/\\/g, "/") + "/" !== walkPath)
        errors.issues.push(`Unprocessed folders`);

      // Show the difference between the folder name, and the show name in the episode title
      // if(parent !== show) console.warn("parent !== show", parent, show);

      if (errors.issues.length) issues.push(errors);
    }
  }
  return issues;
};

const fileFilter = filepath => filepath.indexOf("desktop.ini") === -1;

walk(walkPath, fileFilter)
  .then(buildDictionary)
  .then(errorCheck); //?
