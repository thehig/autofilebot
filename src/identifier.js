
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
  f => f.replace(/\bMrs\b/g, "Mrs."),
];

const transformFileName = filename =>
  transformers.reduce(
    (prev, next) => next(prev), // Call each transformer in order
    filename.split(" - ")[0].trim() // Starting with the first part of the split filename
  );

const identifyFilename = filename => {
  const [showName, ...episodes] = filename.split("\\");

  // Avoid any nested folders and just get the episode name
  const episode = episodes.pop();
  if (episodes.length) {
    // Nested Folders. Don't need to do anything now, but might be an issue in the future
    console.warn("Nested folder", episodes);
  }

  return [showName, episode];
}

module.exports = {
  identifyFilename,
  transformFileName
};
