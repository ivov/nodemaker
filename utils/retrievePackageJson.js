const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const prettyStringify = require("json-stringify-pretty-compact");

const fetchPackageJson = async () => {
  const url =
    "https://raw.githubusercontent.com/n8n-io/n8n/master/packages/nodes-base/package.json";
  const response = await fetch(url);
  return response.json();
};

const savePackageJson = async (packageJsonData) => {
  const destinationPath = path.join("output", "package.json");
  fs.writeFileSync(destinationPath, prettyStringify(packageJsonData), {
    indent: 2,
  });
};

const retrievePackageJson = async () => {
  const packageJsonData = await fetchPackageJson();
  savePackageJson(packageJsonData);
};

module.exports = retrievePackageJson;
