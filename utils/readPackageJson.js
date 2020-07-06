const fs = require("fs");
const path = require("path");

const readPackageJson = () => {
  const sourcePath = path.join("output", "package.json");
  return JSON.parse(fs.readFileSync(sourcePath).toString());
};

module.exports = readPackageJson;
