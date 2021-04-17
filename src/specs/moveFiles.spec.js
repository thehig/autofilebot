// console.log(""); // use log before requiring mockfs to prevent 'callsites' error
const mock = require("mock-fs");
const fs = require("fs");

const config = require("config");
const fromDir = config.get("fromTV");
const toDir = config.get("to");

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

const { moveFiles } = require("../moveFiles");

describe.skip("move files", () => {
  beforeEach(() => {
    mock(fileStructure);
  });

  afterEach(() => {
    mock.restore();
  });

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
