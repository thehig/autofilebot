module.exports = function (wallaby) {
  
  // Babel needs this
  process.env.NODE_ENV = 'wallaby';

  return {
    files: [
      'src/**/*.js?(x)',
      'src/**/*.snap',
      '!src/**/*.spec.js?(x)',
      'config/**/*.*'
    ],

    tests: [
      'spec/**/*.js',
      'src/**/*.spec.js?(x)'
    ],
    
    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'jest',

    debug: true
  };
};