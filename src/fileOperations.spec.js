const { mock } = require("../spec/setup");
const { recursiveWalk, recurseDirForVideos } = require("./fileOperations");

const config = require("config");
const fromDir = config.get("from").replace(/\\/g, "/"); //?
const patterns = config.get("ignorePatterns"); //?

// recurseDirForVideos(config.get("from"), config.get("ignorePatterns"))
describe("fileOperations", () => {
  let mockInstance;
  beforeAll(() => {
    mockInstance = mock();
    jest.setTimeout(30 * 1000);
  });
  afterAll(() => {
    mockInstance.restore();
  });

  describe("recursive walk", () => {
    it(`${fromDir}`, done =>
      recursiveWalk(`${fromDir}`)
        .then(files => {
          expect(files.length).toBe(7);
          done();
        })
        .catch(err => done.fail(err))
      );
  });

  // describe("mocks", () => {
  //   it(`${fromDir}/*`, done =>
  //     glob(`${fromDir}/*`, (err, files) => {
  //       if (err) done(err);
  //       expect(files.length).toBe(3);
  //       done();
  //     }));
  //   it(`${fromDir}/complete/*`, done =>
  //     glob(`${fromDir}/complete/*`, (err, files) => {
  //       if (err) done(err);
  //       expect(files.length).toBe(5);
  //       done();
  //     }));
  //   it(`${fromDir}/incomplete/*`, done =>
  //     glob(`${fromDir}/incomplete/*`, (err, files) => {
  //       if (err) done(err);
  //       expect(files.length).toBe(1);
  //       done();
  //     }));
  //   it.only(`${fromDir}/**/*`, done =>
  //     glob(`${fromDir}/**/`, (err, files) => {
  //       if (err) done(err);
  //       expect(files.length).toBe(7);
  //       done();
  //     }));
  // });

  // describe("recurseDirForVideos", () => {
  //   it(`Scans ${fromDir} recursively`, () => {
  //     return recurseDirForVideos(fromDir).then(files => {
  //       expect(files.length).toBe(7);
  //     });
  //   });

  //   // for videos matching ${patterns}
  // });
});
