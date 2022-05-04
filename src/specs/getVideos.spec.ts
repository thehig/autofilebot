// console.log(""); // use log before requiring mockfs to prevent 'callsites' error
import mock from "mock-fs";

import config from "config";
const fromDir: string = config.get("fromTV");

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

import { getVideos } from "../getVideos";

describe("getVideos", () => {
  beforeEach(() => {
    mock(fileStructure);
  });

  afterEach(() => {
    mock.restore();
  });

  it("gets the 1 matching video", () =>
    getVideos(fromDir).then((videos) => {
      expect(videos.length).toBe(1);
    }));
});
