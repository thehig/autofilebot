const config = require("config");

const takeOwnership = require("./takeOwnership");

const tempDir = config.get("temp");
const takeOwnershipOfTempDir = () => takeOwnership(tempDir);

module.exports = takeOwnershipOfTempDir;
