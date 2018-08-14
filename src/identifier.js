const path = require("path");

const transformers = [
  // === Standard Character Replace/Removal ===
  f => f.replace(/(-)/g, " "), // Replace special chars with space
  f => f.replace(/('|\.)/g, ""), // Remove special chars completely

  f => (f.indexOf("(") > -1 ? f.substring(0, f.indexOf("(") - 1) : f), // Remove the year

  // === Special Cases ===

  // Archer
  f => f.replace(/Archer/g, "Archer (2009)"),
  // Doctor Who
  f => f.replace(/Doctor/g, "Dr"),
  // Planet Earth 2
  f => f.replace(/II/g, "2"),
  // Last Week Tonight
  f => f.replace(/ with John Oliver/g, ""),
  // The Marvelous Mrs. Maisel
  f => f.replace(/\bMrs\b/g, "Mrs.")
];

const cleanShowName = filename =>
  transformers.reduce(
    (prev, next) => next(prev), // Call each transformer in order
    filename
  );

module.exports = filepath => {
  // Split the file path at the path separators
  const pathChunks = filepath.split(path.sep);
  // The last one is the file
  const filename = pathChunks.pop();
  // The next one is the folder containing the file
  const parent = pathChunks.pop();
  // And we stitch the unused stuff back together
  const unprocessed = pathChunks.join(path.sep);
  
  // Split the filename into its component parts
  const [show, ep, title, ...otherBits] = filename.split(" - ");
  if(otherBits.length) throw new Error(`Unknown file elements: [${otherBits}] in ${filepath}`);
  return {
    show: cleanShowName(show),  // Clean up the show name
    ep,
    title,

    path: {
      filepath,
      parent,
      unprocessed
    }
  };
};
