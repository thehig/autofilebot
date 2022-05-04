#!/usr/bin/env node

const config = require("config");
const fromDir = config.get("fromTV");
const tempDir = config.get("temp");
const toDir = config.get("to");

const main = require("../src/main").default;
const wrap = require("../src/wrap/console").default;
const _main = wrap(main);

_main(fromDir, tempDir, toDir);
