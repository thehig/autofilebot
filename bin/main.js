#!/usr/bin/env node

const yargs = require("yargs");
const path = require("path");
process.env.NODE_CONFIG_DIR = path.join(__dirname, "../config");

const config = require("config");
const fromDir = config.get("fromTV");
const tempDir = config.get("temp");
const toDir = config.get("to");

const main = require("../src/main").default;
const { postProcess } = require("../src/postProcess");

const wrap = require("../src/consoleWrapper").default;
const _postProcess = wrap(postProcess);
const _main = wrap(main);

const options = yargs.usage("Usage: -p").option("p", {
  alias: "postProcess",
  describe: "Move files from the temp dir to their approriate directory",
  type: "boolean",
  demandOption: false,
}).argv;

if (options["post-process"]) {
  _postProcess(tempDir, toDir);
} else {
  _main(fromDir, tempDir, toDir);
}
