const transformers = [
  // === Standard Character Replace/Removal ===
  f => f.replace(/(-)/g, " "), // Replace special chars with space
  f => f.replace(/('|\.)/g, ""), // Remove special chars completely

  f => (f.indexOf("(") > -1 ? f.substring(0, f.indexOf("(") - 1) : f), // Remove the year

  // === Special Cases ===
  
  // Doctor Who
  f => f.replace(/Doctor/g, "Dr"),  
  // Planet Earth 2
  f => f.replace(/II/g, "2"),  
  // Last Week Tonight
  f => f.replace(/ with John Oliver/g, ""),  
  // The Marvelous Mrs. Maisel
  f => f.replace(/\bMrs\b/g, "Mrs."),
];

module.exports = filename =>
  transformers.reduce(
    (prev, next) => next(prev), // Call each transformer in order
    filename.split(" - ")[0].trim() // Starting with the first part of the split filename
  );
