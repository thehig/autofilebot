import { isIgnored } from "./isIgnored";

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
