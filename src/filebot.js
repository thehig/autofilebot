// Execute child process
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const runFilebot = directory =>
new Promise((resolve, reject) => {
  const filebotCommand = c.filebotCommand.replace("$PATTERN$", directory);
  if (c.debug) console.log(`Running filebot: ${filebotCommand}`);
  resolve(exec(filebotCommand));
});
