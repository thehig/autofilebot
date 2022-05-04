module.exports = function (wallaby) {
  process.env.NODE_ENV = "test";

  return {
    files: [
      "config/**/*.*",
      "src/*.ts",
      "src/*.snap",
      "!src/*.spec.ts",
    ],

    tests: ["src/*.spec.ts"],
  };
};
