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
        .catch(err => done.fail(err)));
    it(`takes an array filter fn (1)`, done =>
      walk(`${fromDir}`, file => file.indexOf("RARBG") === -1)
        .then(files => {
          expect(files.length).toBe(6);
          done();
        })
        .catch(err => done.fail(err)));
    it(`takes an array filter fn (2)`, done =>
      walk(`${fromDir}`, file => file.indexOf("someFile") === -1)
        .then(files => {
          expect(files.length).toBe(1);
          done();
        })
        .catch(err => done.fail(err)));
    it("catches a broken filter", done =>
      walk(`${fromDir}`, () => {
        throw new Error("should catch");
      })
        .then(() => done.fail("Should have thrown"))
        .catch(err => {
          expect(err.message).toContain("should catch");
          done();
        }));
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
