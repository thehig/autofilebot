// console.log(""); // use log before requiring mockfs to prevent 'callsites' error
const mock = require("mock-fs");
const fs = require("fs");

const config = require("config");
const fromDir = config.get("fromTV");
const logfile = config.get("log");

const { appendToLog } = require("../appendToLog");

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

describe("append to log", () => {
  beforeEach(() => {
    mock(fileStructure);
  });

  afterEach(() => {
    mock.restore();
  });
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
