module.exports = function (wallaby) {
  process.env.NODE_ENV = "test";

  return {
    files: [
      "config/**/*.*",
      "src/*.ts",
      "src/*.snap",
      "!src/specs/*.spec.ts",
    ],

    tests: ["src/specs/*.spec.ts"],
  };
};
