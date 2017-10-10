module.exports = function(wallaby) {
  process.env.NODE_ENV = "development";
  // process.env.NODE_CONFIG_STRICT_MODE = 1;

  return {
    debug: true,
    files: [
      "src/**/*.js",
      "config/*.yaml",
      "!src/**/*.jest.js", 
      "!src/**/*.test.js", 
      "!test/**/*" 
    ],

    tests: [
      "src/**/*.test.js",
      "test/*.spec.js"
    ],

    env: {
      type: "node",
      runner: "node"
    },

    testFramework: "mocha",
    setup: function () {
      var chai = require("chai");
      var chaiAsPromised = require("chai-as-promised");
      
      chai.use(chaiAsPromised);    
      expect = chai.expect;  
    }
  };
};
