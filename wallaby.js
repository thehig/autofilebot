module.exports = function (wallaby) {
  process.env.NODE_ENV = "test";

  return {
    files: [
      "src/**/*.js?(x)",
      "src/**/*.snap",
      "!src/**/*.spec.js?(x)",

      "spec/**/*.js",
      "config/**/*.*",
    ],

    tests: ["src/**/*.spec.js?(x)"],

    env: {
      type: "node",
      runner: "node",
    },

    testFramework: "jest",

    debug: true,
    trace: true,
  };
};
