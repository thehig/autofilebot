// Create Fixtures
const mockFs = require('mock-fs');
const config = require("config");

config.util.getConfigSources() //?

const fromDir = config.get('from');
const tempDir = config.get('temp');

mockFs({
  [fromDir]: {
    // unprocessed video
    'RARBG.mp4': '',// ignored
    incomplete: { // all ignored
      'someFile.mp4': ''
    },
    complete: {
      'someFile.mp4': '', // included
      'someFile.sample.mp4': '', // ignored
      'someFile sample.mp4': '', // ignored
      'someFile SAMPLE.mp4': '', // ignored
      'someFile Sample.mp4': '' // ignored
    }
  }
});
