const isVideo = require("../isVideo");

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
