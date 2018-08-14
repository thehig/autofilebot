const id = require("./identifier");

const nyi = done => done.fail('Not Yet Implemented');

describe("identifier", () => {
  describe("takes a filepath as a parameter", () => {
    it("takes the last element as the file", nyi);
    it("takes the second last element as the parent", nyi);
    it("takes the remaining elements as unprocessed", nyi);
  });

  describe("splits the file name", () => {
    it("splits the name into 'Show', 'Ep' and 'Title'", nyi);
    it("can handle additional split characters without error", nyi);
    // [Strange Pilot.mkv] in D:\Sorted Torrents\TV\Archer (2009)\Archer (2009) - 9x01 - Danger Island - Strange Pilot.mkv​​
  });

  describe("errors if", () => {
    it("a file name does not match this 'pattern' of `Show - Ep - Title`", nyi);
    it("show, ep or title is empty", nyi);
    it("unprocessed bits contains anything", nyi);
  });

  describe("cleans the show name", () => {
    it("replaces special characters with a space", nyi);
    it("replaces special characters with nothing", nyi);
    it("removes the year (if present)", nyi);
  });

  describe("handles special case names", () => {
    it("handles Archer (Year needed for Kodi)", nyi);
    it("handles Doctor Who", nyi);
    it("handles Planet Earth", nyi);
    it("handles Last Week Tonight", nyi);
    it("handles Marvelous Mrs. Maisel", nyi);
  });
});
