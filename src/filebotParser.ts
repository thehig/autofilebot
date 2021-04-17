import chalk from "chalk";

const log = (execResult, isError) => {
  const message = execResult.message;
  const killed = execResult.killed;
  const code = execResult.code;
  const signal = execResult.signal;
  const cmd = execResult.cmd;
  const stdout = execResult.stdout;
  const stderr = execResult.stderr;

  const color = isError ? chalk.red : chalk.blue;

  cmd && console.log(color("[filebotParser][cmd]"), cmd);
  message && console.log(color("[filebotParser][message]"), message.trim());
  killed && console.log(color("[filebotParser][killed]"), killed);
  code && console.log(color("[filebotParser][code]"), code);
  signal && console.log(color("[filebotParser][signal]"), signal);

  stdout &&
    console.log(
      stdout
        .trim()
        .split("\n")
        .map((t) => color("[filebotParser][stdout] ") + t)
        .join("\n")
    );

  stderr &&
    console.log(
      stderr
        .trim()
        .split("\n")
        .map((t) => chalk.red("[filebotParser][stderr] ") + t)
        .join("\n")
    );
};

export const filebotParser = (execResult, isError) =>
  new Promise((resolve, reject) => {
    if (!execResult) resolve("");
    log(execResult, isError);

    if (isError) {
      // The result is an error
      // eg:
      //    Rename episodes using [TheTVDB] with [Airdate]
      //    No media files: [E:\Media\Temp\autofilebot.log]
      //    Failure (�_�)??
      // eg:
      //    Rename episodes using [TheTVDB] with [Airdate]
      //    Lookup via [Batwoman]
      //    Fetching episode data for [Batwoman]
      //    Fetching episode data for [Batman]
      //    Fetching episode data for [The Batman]
      //    Fetching episode data for [Batman: The Animated Series]
      //    Fetching episode data for [The New Batman Adventures]
      //    Skipped [E:\Media\Temp\Batwoman - 1x09 - Crisis on Infinite Earths (2).mkv] because [E:\Media\Temp\Batwoman - 1x09 - Crisis on Infinite Earths (2).mkv] already exists
      //    Processed 0 files
      return resolve(execResult.message);
    }

    // The result is a success
    // eg:
    //      Rename episodes using [TheTVDB] with [Airdate]
    //      Lookup via [Batwoman]
    //      Fetching episode data for [Batwoman]
    //      Fetching episode data for [Batman]
    //      Fetching episode data for [The Batman]
    //      Fetching episode data for [Batman: The Animated Series]
    //      Fetching episode data for [The New Batman Adventures]
    //      [MOVE] from [E:\Media\Temp\BEFORENAME.mkv] to [E:\Media\Temp\AFTERNAME.mkv]
    //      Processed 1 file

    return resolve(execResult.stdout);
  });
