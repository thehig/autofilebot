// console.log(""); // use log before requiring mockfs to prevent 'callsites' error
import mock from "mock-fs";
import fs from "fs";
import sinon from "sinon";

import config from "config";
const tempDir: string = config.get("temp"); //?
const toDir: string = config.get("to"); //?

import { walk } from "./fs/walk";
import { postProcess } from "./postProcess";
import * as EnsureDir from "./fs/ensureDir";

describe("postProcess", () => {
  // beforeEach(() => {
  //   mock(fileStructure);
  // });

  afterEach(() => {
    mock.restore();
  });

  describe("errors if", () => {
    it("missing fromDir", (done) => {
      // @ts-ignore
      postProcess()
        .then(() => done.fail())
        .catch((err) => {
          expect(err.message).toContain("missing");
          done();
        });
    });

    it("missing toDir", (done) => {
      // @ts-ignore
      postProcess("someparam")
        .then(() => done.fail())
        .catch((err) => {
          expect(err.message).toContain("missing");
          done();
        });
    });
  });

  describe("single files", () => {});

  it("moves 1 file from temp to existing destination", () => {
    mock({
      [tempDir]: {
        "Ash vs Evil Dead - 3x06 - Tales from the Rift.mkv": "",
      },
      [toDir]: {
        "Ash vs Evil Dead": {
          "Ash vs Evil Dead - 3x01 - Family.mkv": "",
          "Ash vs Evil Dead - 3x02 - Booth Three.mkv": "",
          "Ash vs Evil Dead - 3x03 - Apparently Dead.mkv": "",
          "Ash vs Evil Dead - 3x04 - Unfinished Business.mkv": "",
          "Ash vs Evil Dead - 3x05 - Baby Proof.mkv": "",
        },
      },
    });

    const before = () =>
      walk(tempDir)
        .then((f) => expect(f).toHaveLength(1))
        .then(() => walk(toDir))
        .then((f) => expect(f).toHaveLength(5));

    const after = () =>
      walk(tempDir)
        .then((f) => expect(f).toHaveLength(0))
        .then(() => walk(toDir))
        .then((f) => expect(f).toHaveLength(6));

    return before()
      .then(() => postProcess(tempDir, toDir))
      .then(() => after());
  });

  it("moves 1 file from temp to non-existing destination", () => {
    mock({
      [tempDir]: {
        "Ash vs Evil Dead - 3x06 - Tales from the Rift.mkv": "",
      },
      [toDir]: {},
    });

    const before = () =>
      walk(tempDir)
        .then((f) => expect(f).toHaveLength(1))
        .then(() => walk(toDir))
        .then((f) => expect(f).toHaveLength(0));

    const after = () =>
      walk(tempDir)
        .then((f) => expect(f).toHaveLength(0))
        .then(() => walk(toDir))
        .then((f) => {
          expect(f).toHaveLength(1);
          expect(f[0]).toContain(
            "Ash vs Evil Dead\\Ash vs Evil Dead - 3x06 - Tales from the Rift.mkv"
          );
        });

    return before()
      .then(() => postProcess(tempDir, toDir))
      .then(() => after());
  });

  it("moves multiple files from temp to existing and non-existing destinations", () => {
    mock({
      [tempDir]: {
        "desktop.ini": "",
        "autofilebot.log": "",
        "Archer (2009) - 8x03 - Jane Doe.mkv": "",
        "Doctor Who (2005) - 8x04 - Listen.mkv": "",
        "Planet Earth II - 1x02 - Mountains.mkv": "",
        "Last Week Tonight with John Oliver - 1x11 - Episode 11.mp4": "",
        "Marvel's Agents of S.H.I.E.L.D. - 2x01 - Shadows.mkv": "",
        "The Marvelous Mrs. Maisel - 1x05 - Doink.mkv": "",
      },
      [toDir]: {
        "Archer (2009)": {
          "Archer (2009) - 8x02 - Archer Dreamland Berenice.mkv": "",
        },
        "Dr Who": {
          "Doctor Who (2005) - 10x02 - Smile.mkv": "",
        },
        "Last Week Tonight": {
          "Last Week Tonight with John Oliver - 1x16 - Episode 16.mp4": "",
        },
        "Planet Earth 2": { "Planet Earth II - 1x03 - Jungles.mkv": "" },
        "Marvels Agents of Shield": {
          "Marvel's Agents of S.H.I.E.L.D. - 5x21 - The Force of Gravity.mkv":
            "",
        },
      },
    });

    const before = () =>
      walk(tempDir)
        .then((f) => expect(f).toHaveLength(8))
        .then(() => walk(toDir))
        .then((f) => expect(f).toHaveLength(5));

    const after = () =>
      walk(tempDir)
        .then((f) => expect(f).toHaveLength(2))
        .then(() => walk(toDir))
        .then((f) => {
          expect(fs.readdirSync(toDir)).toHaveLength(6);
          expect(f).toHaveLength(11);
          expect(f).toMatchSnapshot();
        });

    return before()
      .then(() => postProcess(tempDir, toDir))
      .then(() => after());
  });

  describe("with spies", () => {
    let spy: sinon.SinonSpy<[directory: string], Promise<void>>;
    beforeEach(() => {
      spy = sinon.spy(EnsureDir, "ensureDir");
    });

    afterEach(() => {
      spy.restore();
    });

    it("moves multiple files from temp to non-existing destinations", () => {
      const mockFilesystem = {
        [tempDir]: {
          "Ash vs Evil Dead - 3x06 - Tales from the Rift.mkv": "",
          "Only Fools And Horses - 1x01 - Something.mkv": "",
          "Only Fools And Horses - 1x02 - Something Else.mkv": "",
          "Stargate - 1x01 - Stargate.mkv": "",
          "Battlestar Galactica - 1x01 - Battlestar Galactica.mkv": "",
        },
        [toDir]: {},
      };

      // @ts-ignore
      mock(mockFilesystem);

      const numFiles = Object.keys(mockFilesystem[tempDir]).length;
      const numUniqueShows = 4;

      const before = () =>
        walk(tempDir)
          .then((tempFiles) => expect(tempFiles).toHaveLength(numFiles))
          .then(() => walk(toDir))
          .then((toFiles) => expect(toFiles).toHaveLength(0))
          .then(() => expect(spy.callCount).toBe(0));

      const after = () =>
        walk(tempDir)
          .then((tempFiles) => expect(tempFiles).toHaveLength(0))
          .then(() => walk(toDir))
          .then((toFiles) => {
            expect(spy.callCount).toBe(numUniqueShows); // We don't call for every entry, but rather every *show*
            expect(toFiles).toHaveLength(numFiles);
          });

      return before()
        .then(() => postProcess(tempDir, toDir))
        .then(() => after());
    });
  });

  /**
   *
   * describe multiple files
   *    to existing destination
   *    to nonexistant destination
   *    to a combination of existing and nonexisting files
   */
});
