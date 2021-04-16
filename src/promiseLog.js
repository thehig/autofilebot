const debug = require("config").get("debug");

const plog = (...params) =>
  new Promise((resolve) => {
    console.log(...params);
    // @ts-ignore
    resolve(...params);
  });

const dplog = (...params) =>
  new Promise((resolve) => {
    if (debug) console.log(...params);
    // @ts-ignore
    resolve(...params);
  });
module.exports = { plog, dplog };
