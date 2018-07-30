const path = require('path');

module.exports = {
  "debug": true,
  "showConfig": false,

  "from": path.join(process.cwd(), "../spec/fixtures/from"),
  "to": path.join(process.cwd(), "../spec/fixtures/to"),
  "temp": path.join(process.cwd(), "../spec/fixtures/temp")
};
