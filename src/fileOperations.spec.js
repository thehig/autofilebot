const { mock } = require("../spec/setup");

const { recurseDirForVideos } = require("./fileOperations");

const config = require('config');
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


  describe("recurseDirForVideos", () => {
    it(`Scans ${fromDir} for videos matching ${patterns}`, () =>
      recurseDirForVideos(fromDir, patterns).then(videos => {
        console.log('videos', videos);
        expect(true).toEqual(false);
      }));
    it('do thing', () => expect(true).toEqual(true));
  });
});
