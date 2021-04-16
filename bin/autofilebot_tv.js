#!/usr/bin/env node
const path = require("path");
process.env.NODE_CONFIG_DIR = path.join(__dirname, "../config");

const main = require("../src/scripts/default.js");
const fromTV = require("config").get("fromTV");

main(fromTV);
