// console.log(""); // use log before requiring mockfs to prevent 'callsites' error
const mock = require("mock-fs");
const fs = require("fs");

const config = require("config");
const { ensureDir, ensureDirs } = require("../ensureDir");

const fromDir = config.get("fromTV");

const fileStructure = {
  [fromDir]: {
    // unprocessed video
    "RARBG.mp4": "", // ignored
    incomplete: {
      // all ignored
      "someFile.mp4": "",
    },
    complete: {
      "someFile.mp4": "", // included
      "someFile.sample.mp4": "", // ignored
      "someFile sample.mp4": "", // ignored
      "someFile SAMPLE.mp4": "", // ignored
      "someFile Sample.mp4": "", // ignored
    },
    "autofilebot.log": "...some previous logs...",
  },
};

describe("ensureDir(s)", () => {
  beforeEach(() => {
    mock(fileStructure);
  });

  afterEach(() => {
    mock.restore();
  });

  describe("ensureDir", () => {
    it("creates the folder if it doesnt exist", (done) => {
      const file = `${fromDir}/doesntExist`;
      expect(fs.existsSync(file)).toBe(false);
      ensureDir(file)
        .then(() => {
          expect(fs.existsSync(file)).toBe(true);
          done();
        })
        .catch((err) => done.fail(err));
    });
  });
  describe("ensureDirs", () => {
    it("creates the folder if it doesnt exist", (done) => {
      const folderA = `${fromDir}/doesntExist`;
      const folderB = `${fromDir}/doesntExistEither`;

      expect(fs.existsSync(folderA)).toBe(false);
      expect(fs.existsSync(folderB)).toBe(false);

      ensureDirs([folderA, folderB, folderA, folderB, folderA, folderB])
        .then(() => {
          expect(fs.existsSync(folderA)).toBe(true);
          expect(fs.existsSync(folderB)).toBe(true);

          done();
        })
        .catch((err) => done.fail(err));
    });
  });
});
