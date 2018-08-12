console.log(""); // use log before requiring mockfs to prevent 'callsites' error
const mock = require("mock-fs");
const fs = require("fs");

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

const { walk, ensureDir, isVideo, isIgnored } = require("./fileOperations");

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

  describe("ensureDir", () => {
    it("creates the folder if it doesnt exist", done => {
      const file = `${fromDir}/doesntExist`;
      expect(fs.existsSync(file)).toBe(false);
      ensureDir(file)
        .then(() => {
          expect(fs.existsSync(file)).toBe(true);
          done();
        })
        .catch(err => done.fail(err));
    });
  });

  describe("isVideo filters", () => {
    describe("excludes", () => {
      it("someFile.txt", () => expect(isVideo("someFile.txt")).toBe(false));
      it("someFile.nfo", () => expect(isVideo("someFile.nfo")).toBe(false));
      it("someFile.srt", () => expect(isVideo("someFile.srt")).toBe(false));
    });
    describe("includes", () => {
      it("someFile.mp4", () => expect(isVideo("someFile.mp4")).toBe(true));
      it("someFile.avi", () => expect(isVideo("someFile.avi")).toBe(true));
      it("someFile.mkv", () => expect(isVideo("someFile.mkv")).toBe(true));
    });
  });

  describe("isIgnored filters", () => {
    describe("excludes", () => {
      it("RARBG.mp4", () => expect(isIgnored("RARBG.mp4")).toBe(true));
      it("incomplete/someFile.mp4", () =>
        expect(isIgnored("incomplete/someFile.mp4")).toBe(true));
      it("someFile.sample.mp4", () =>
        expect(isIgnored("someFile.sample.mp4")).toBe(true));
      it("someFile sample.mp4", () =>
        expect(isIgnored("someFile sample.mp4")).toBe(true));
      it("someFile SAMPLE.mp4", () =>
        expect(isIgnored("someFile SAMPLE.mp4")).toBe(true));
      it("someFile Sample.mp4", () =>
        expect(isIgnored("someFile Sample.mp4")).toBe(true));
    });
    describe("includes", () => {
      it("someFile.mp4", () => expect(isIgnored("someFile.mp4")).toBe(false));
      it("complete/someFile.avi", () => expect(isIgnored("complete/someFile.avi")).toBe(false));
    });
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
