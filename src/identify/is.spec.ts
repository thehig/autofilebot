import { video as isVideo, ignored as isIgnored } from "./is";

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
