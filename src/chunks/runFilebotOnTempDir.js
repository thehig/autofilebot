const config = require("config");
const runFilebot = require("./runFilebot");

const tempDir = config.get("temp");
const runFilebotOnTempDir = () => runFilebot(tempDir);

module.exports = runFilebotOnTempDir;
