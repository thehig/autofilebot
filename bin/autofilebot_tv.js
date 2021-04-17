#!/usr/bin/env node
const path = require("path");
process.env.NODE_CONFIG_DIR = path.join(__dirname, "../config");

const main = require("../main.ts");
const fromTV = require("config").get("fromTV");

main(fromTV);
