const config = require("config");
const debug = config.get("debug");
const runFilebot = require("./filebot");
const chalk = require("chalk");

const {
  ensureDir,
  getVideos,
  moveFiles,
  appendToLog
} = require("./fileOperations");

if (config.get("showConfig"))
  console.log(`
=== config ===
${JSON.stringify(config.util.getConfigSources(), null, 4)}
==============
`);

const prettifyFileList = filenames =>
  filenames
    .map(f => "\n\t* " + chalk.green(f.substring(f.lastIndexOf("\\") + 1)))
    .join("");

// Make sure "temp/" exists
ensureDir(config.get("temp"))
  // Get videos in "from"/
  .then(() =>
    getVideos(config.get("from")).then(filenames => {
      if (!filenames.length) {
        // Handle no files
        throw new Error("No files found");
      }
      return filenames;
    })
  )
  // Move files "from/" => "temp/"
  .then(filenames => {
    // User-friendly output
    console.log(
      `Moving ${chalk.yellow(config.get("from"))} => ${chalk.yellow(
        config.get("temp")
      )}`,
      prettifyFileList(filenames)
    );
    return moveFiles(config.get("temp"), filenames);
  })
  // Run filebot on "temp/" and log the result
  .then(() =>
    runFilebot(config.get("temp"))
      // Write success output to log
      .then(log =>
        appendToLog(config.get("temp"), config.get("log"), log.stdout)
      )
      // Write error output to log
      .catch(log =>
        appendToLog(config.get("temp"), config.get("log"), log.stderr).then(
          () => {
            // Rethrow the error
            throw new Error(log.stderr);
          }
        )
      )
  )
  // Get renamed videos from "temp/"
  .then(() =>
    getVideos(config.get("temp")).then(filenames => {
      console.log(
        `Videos in ${chalk.yellow(config.get("temp"))}`,
        prettifyFileList(filenames)
      );
    })
  )

  // .then(() =>
  //   recurseDirForVideos(config.get("temp"), config.get("ignorePatterns"))
  // )
  // .then(files => Promise.all(files.map(f => getShowName(f))))
  // .then(showNames => createShowDictionary(showNames))
  .then(
    msg =>
      msg && console.log(chalk.red(`Output: ${JSON.stringify(msg, null, 4)}`))
  )
  // .then(msg => console.log(`Output: ${msg}`))
  .catch(err => console.error(chalk.red(err)));
