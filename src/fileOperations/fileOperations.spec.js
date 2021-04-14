console.log(""); // use log before requiring mockfs to prevent 'callsites' error
const mock = require("mock-fs");
const fs = require("fs");

const config = require("config");
const fromDir = config.get("from"); //?
const toDir = config.get("to"); //?
const logfile = config.get("log"); //?

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

const {
  walk,
  ensureDir,
  isVideo,
  isIgnored,
  getVideos,
  moveFiles,
  appendToLog,
} = require("./");

describe("fileOperations", () => {
  beforeEach(() => {
    mock(fileStructure);
  });

  afterEach(() => {
    mock.restore();
  });

  describe("walk", () => {
    it(`${fromDir} returns 8 files from mock fs`, (done) =>
      walk(`${fromDir}`)
        .then((files) => {
          expect(files.length).toBe(8);
          done();
        })
        .catch((err) => done.fail(err)));
    it(`takes an array filter fn (1)`, (done) =>
      walk(`${fromDir}`, (file) => file.indexOf("RARBG") === -1)
        .then((files) => {
          expect(files.length).toBe(7);
          done();
        })
        .catch((err) => done.fail(err)));
    it(`takes an array filter fn (2)`, (done) =>
      walk(`${fromDir}`, (file) => file.indexOf("someFile") === -1)
        .then((files) => {
          expect(files.length).toBe(2);
          done();
        })
        .catch((err) => done.fail(err)));
    it("catches a broken filter", (done) =>
      walk(`${fromDir}`, () => {
        throw new Error("should catch");
      })
        .then(() => done.fail("Should have thrown"))
        .catch((err) => {
          expect(err.message).toContain("should catch");
          done();
        }));
  });

  describe("isVideo", () => {
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

  describe("isIgnored", () => {
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
      it("complete/someFile.avi", () =>
        expect(isIgnored("complete/someFile.avi")).toBe(false));
    });
  });

  describe("getVideos", () => {
    it("gets the 1 matching video", (done) =>
      getVideos(fromDir)
        .then((videos) => {
          expect(videos.length).toBe(1);
          done();
        })
        .catch((err) => done.fail(err)));
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

  describe("move files", () => {
    it("moves a list of files", (done) => {
      const sourceFilename = `${fromDir}/complete/someFile.mp4`;
      expect(fs.existsSync(sourceFilename)).toBe(true);
      const expectedFileName = `${toDir}/someFile.mp4`;
      expect(fs.existsSync(expectedFileName)).toBe(false);

      moveFiles(toDir, [sourceFilename])
        .then(() => {
          expect(fs.existsSync(sourceFilename)).toBe(false);
          expect(fs.existsSync(expectedFileName)).toBe(true);
          done();
        })
        .catch((err) => done.fail(err));
    });
  });

  describe("append to log", () => {
    it("appends to the specified file", (done) => {
      const before = fs.readFileSync(`${fromDir}/${logfile}`, "utf8"); //?
      const newLog = "Something something dark side";
      appendToLog(fromDir, logfile, newLog)
        .then(() => {
          const after = fs.readFileSync(`${fromDir}/${logfile}`, "utf8"); //?
          expect(after).toContain(before + "\n"); // It adds a newline
          expect(after).toContain(newLog);
          done();
        })
        .catch((err) => done.fail(err));
    });
  });
});
