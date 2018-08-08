const fs = require("fs-extra");

const { mock } = require("../spec/setup");

const { recurseDirForVideos } = require("./fileOperations");

const config = require("config");
const fromDir = config.get("from"); //?
const patterns = config.get("ignorePatterns"); //?

// recurseDirForVideos(config.get("from"), config.get("ignorePatterns"))
describe("fileOperations", () => {
  let mockInstance;
  beforeEach(() => {
    mockInstance = mock();
  });
  afterEach(() => {
    mockInstance.restore();
  });

  describe('mocks', () => {
    it(`${fromDir}`, () => {
      const files = fs.readdirSync(fromDir); //?
      expect(files.length).toBe(3);
    });
    it(`${fromDir}/complete`, () => {
      const files = fs.readdirSync(`${fromDir}/complete`); //?
      expect(files.length).toBe(5);
    });
    it(`${fromDir}/incomplete`, () => {
      const files = fs.readdirSync(`${fromDir}/incomplete`); //?
      expect(files.length).toBe(1);
    });
  });
  

  describe("recurseDirForVideos", () => {
    it(`Scans ${fromDir} recursively`, () => {
      return recurseDirForVideos(fromDir).then(files => {
        expect(files.length).toBe(7);
      });
    });

    // for videos matching ${patterns}
  });
});
