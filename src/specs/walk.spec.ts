// console.log(""); // use log before requiring mockfs to prevent 'callsites' error
import mock from "mock-fs";

import config from "config";
const fromDir: string = config.get("fromTV");
import { walk } from "../walk";

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

describe("walk", () => {
  beforeEach(() => {
    mock(fileStructure);
  });

  afterEach(() => {
    mock.restore();
  });

  it(`${fromDir} returns 8 files from mock fs`, () =>
    walk(`${fromDir}`).then((files) => {
      expect(files.length).toBe(8);
    }));
  it(`takes an array filter fn (1)`, () =>
    walk(`${fromDir}`, (file) => file.indexOf("RARBG") === -1).then((files) => {
      expect(files.length).toBe(7);
    }));

  it(`takes an array filter fn (2)`, () =>
    walk(`${fromDir}`, (file) => file.indexOf("someFile") === -1).then(
      (files) => {
        expect(files.length).toBe(2);
      }
    ));
  it("catches a broken filter", () =>
    walk(`${fromDir}`, () => {
      throw new Error("should catch");
    })
      .then(() => {
        throw new Error("Should have thrown");
      })
      .catch((err) => {
        expect(err.message).toContain("should catch");
      }));
});
