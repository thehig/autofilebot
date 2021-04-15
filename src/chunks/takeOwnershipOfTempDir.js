const takeOwnership = require("./takeOwnership");

const tempDir = require("config").get("temp");

const takeOwnershipOfTempDir = () => takeOwnership(tempDir);

module.exports = takeOwnershipOfTempDir;
