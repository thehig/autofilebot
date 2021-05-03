// #!/usr/bin/env node

import { usage } from "yargs";
import { join } from "path";
process.env.NODE_CONFIG_DIR = join(__dirname, "../config");

import { get } from "config";
const fromDir = get("fromTV");
const tempDir = get("temp");
const toDir = get("to");

import main from "../src/main";
import { postProcess } from "../src/postProcess";

import wrap from "../src/consoleWrapper";
const _postProcess = wrap(postProcess);
const _main = wrap(main);

const options = usage("Usage: -p").option("p", {
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
