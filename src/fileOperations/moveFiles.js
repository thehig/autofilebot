const fs = require("fs-extra");
const path = require("path");

const moveFiles = (destination, filenames) =>
  Promise.all(
    filenames.map((filename) =>
      fs
        .move(filename, path.join(destination, path.basename(filename)))
        .catch((err) => {
          // Add relevant information to the outgoing error
          throw new Error(
            `${err} source: ${filename} dest: ${path.join(
              destination,
              path.basename(filename)
            )})`
          );
        })
    )
  );

module.exports = moveFiles;
