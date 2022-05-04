// @ts-ignore
import id from "./showNameIdentifier";

// @ts-ignore
const nyi = (done) => done.fail("Not Yet Implemented");

describe.skip("identifier", () => {
  describe.skip("takes a filepath as a parameter", () => {
    it("takes the last element as the file", (d) => nyi(d));
    it("takes the second last element as the parent", (d) => nyi(d));
    it("takes the remaining elements as unprocessed", (d) => nyi(d));
  });

  describe.skip("splits the file name", () => {
    it("splits the name into 'Show', 'Ep' and 'Title'", (d) => nyi(d));
    it("can handle additional split characters without error", (d) => nyi(d));
    // [Strange Pilot.mkv] in D:\Sorted Torrents\TV\Archer (2009)\Archer (2009) - 9x01 - Danger Island - Strange Pilot.mkv​​
  });

  describe.skip("errors if", () => {
    it("a file name does not match this 'pattern' of `Show - Ep - Title`", (d) =>
      nyi(d));
    it("show, ep or title is empty", (d) => nyi(d));
    it("unprocessed bits contains anything", (d) => nyi(d));
  });

  describe.skip("cleans the show name", () => {
    it("replaces special characters with a space", (d) => nyi(d));
    it("replaces special characters with nothing", (d) => nyi(d));
    it("removes the year (if present)", (d) => nyi(d));
  });

  describe.skip("handles special case names", () => {
    it("handles Archer (Year needed for Kodi)", (d) => nyi(d));
    it("handles Doctor Who", (d) => nyi(d));
    it("handles Planet Earth", (d) => nyi(d));
    it("handles Last Week Tonight", (d) => nyi(d));
    it("handles Marvelous Mrs. Maisel", (d) => nyi(d));
  });
});
