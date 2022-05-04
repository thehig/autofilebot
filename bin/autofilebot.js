#!/usr/bin/env node
// import { usage } from "yargs";

const config = require("config");
const fromDir = config.get("fromTV");
const tempDir = config.get("temp");
const toDir = config.get("to");

const main = require("../src/main").default;
const wrap = require("../src/consoleWrapper").default;
// @ts-ignore
const _main = wrap(main);

_main(fromDir, tempDir, toDir);
