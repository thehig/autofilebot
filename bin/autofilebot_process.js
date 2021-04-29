#!/usr/bin/env node
const path = require("path");
process.env.NODE_CONFIG_DIR = path.join(__dirname, "../config");

const config = require("config");
const tempDir = config.get("temp");
const toDir = config.get("to");

const wrap = require("../src/consoleWrapper").default;
const { postProcess } = require("../src/postProcess");

wrap(postProcess)(tempDir, toDir);
