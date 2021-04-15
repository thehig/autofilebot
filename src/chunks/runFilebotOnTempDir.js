const runFilebot = require("./runFilebot");

const tempDir = require("config").get("temp");

const runFilebotOnTempDir = () => runFilebot(tempDir);

module.exports = runFilebotOnTempDir;
