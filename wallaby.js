module.exports = function() {
  process.env.NODE_ENV = "development";
  // process.env.NODE_CONFIG_STRICT_MODE = 1;

  return {
    debug: true,
    files: ["src/**/*.js", "!src/**/*.test.js", "config/*.yaml"],

    tests: ["src/**/*.test.js"],

    env: {
      type: "node",
      runner: "node"
    },

    testFramework: "mocha"
  };
};
