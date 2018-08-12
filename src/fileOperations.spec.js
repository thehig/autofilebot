console.log(""); // use log before requiring mockfs to prevent 'callsites' error
const mock = require("mock-fs");

const config = require("config");
const fromDir = config.get("from"); //?

const fileStructure = {
  [fromDir]: {
    // unprocessed video
    "RARBG.mp4": "", // ignored
    incomplete: {
      // all ignored
      "someFile.mp4": ""
    },
    complete: {
      "someFile.mp4": "", // included
      "someFile.sample.mp4": "", // ignored
      "someFile sample.mp4": "", // ignored
      "someFile SAMPLE.mp4": "", // ignored
      "someFile Sample.mp4": "" // ignored
    }
  }
};

const { walk } = require("./fileOperations");

describe("fileOperations", () => {

  beforeEach(() => {
    mock(fileStructure);
  });

  afterEach(() => {
    mock.restore();
  });

  describe("walk", () => {
    it(`${fromDir} returns 7 files from mock fs`, done =>
      walk(`${fromDir}`)
        .then(files => {
          expect(files.length).toBe(7);
          done();
        })
        .catch(err => done.fail(err))
      );
  });

  // describe("recurseDirForVideos", () => {
  //   it(`Scans ${fromDir} recursively`, () => {
  //     return recurseDirForVideos(fromDir).then(files => {
  //       expect(files.length).toBe(7);
  //     });
  //   });

  //   // for videos matching ${patterns}
  // });
});
