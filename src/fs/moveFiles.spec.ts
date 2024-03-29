// console.log(""); // use log before requiring mockfs to prevent 'callsites' error
import mock from "mock-fs";
import fs from "fs";

import config from "config";
const fromDir:string = config.get("fromTV");
const toDir:string = config.get("to");

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

import { moveFiles } from "./moveFiles";

describe("move files", () => {
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
