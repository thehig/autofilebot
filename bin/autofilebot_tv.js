#!/usr/bin/env node
const path = require("path");
process.env.NODE_CONFIG_DIR = path.join(__dirname, "../config");

const config = require("config");
const wrap = require("../src/consoleWrapper").default;
const main = require("../src/main").default;

wrap(main)(config.get("fromTV"), config.get("temp"), config.get("to"));
