console.log(""); // use log before requiring mockfs to prevent 'callsites' error
const mock = require("mock-fs");
const fs = require("fs");

const config = require("config");
const tempDir = config.get("temp"); //?
const toDir = config.get("to"); //?
const logfile = config.get("log"); //?

const fileStructure = {
  [tempDir]: {
    "Ash vs Evil Dead - 3x06 - Tales from the Rift.mkv": ""
  },
  [toDir]: {
    "Ash vs Evil Dead": {
      "Ash vs Evil Dead - 3x01 - Family.mkv": "",
      "Ash vs Evil Dead - 3x02 - Booth Three.mkv": "",
      "Ash vs Evil Dead - 3x03 - Apparently Dead.mkv": "",
      "Ash vs Evil Dead - 3x04 - Unfinished Business.mkv": "",
      "Ash vs Evil Dead - 3x05 - Baby Proof.mkv": ""
    }
  }
};

const { walk } = require("./fileOperations");
const postProcess = require("./postProcessing");

const nyi = done => done.fail("Not Yet Implemented");

describe.only("postProcessing", () => {
  beforeEach(() => {
    mock(fileStructure);
  });

  afterEach(() => {
    mock.restore();
  });

  describe("errors if", () => {
    it("missing fromDir", done => {
      postProcess()
        .then(() => done.fail())
        .catch(err => {
          expect(err.message).toContain("missing");
          done();
        });
    });

    it("missing toDir", done => {
      postProcess("someparam")
        .then(() => done.fail())
        .catch(err => {
          expect(err.message).toContain("missing");
          done();
        });
    });
  });

  it("moves file from temp to destination dir", () => {
    const before = () =>
      walk(tempDir)
        .then(f => expect(f).toHaveLength(1))
        .then(() => walk(toDir))
        .then(f => expect(f).toHaveLength(5));

    const after = () =>
      walk(tempDir)
        .then(f => expect(f).toHaveLength(0))
        .then(() => walk(toDir))
        .then(f => expect(f).toHaveLength(6));

    return before()
      .then(() => postProcess(tempDir, toDir))
      .then(() => after());
  });
});
