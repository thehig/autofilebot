module.exports = function (wallaby) {
  process.env.NODE_ENV = "test";

  return {
    files: [
      // "package.json",
      // "bin/*.js?(x)",
      "config/**/*.*",
      "src/**/*.js?(x)",
      "src/**/*.ts?(x)",
      "src/**/*.snap",
      "!src/specs/*.js?(x)",
    ],

    tests: ["src/**/*.spec.js?(x)"],

    env: {
      type: "node",
    },

    testFramework: "jest",
  };
};
