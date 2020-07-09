import fs from "fs";
import path from "path";
import fetch from "node-fetch";

const fetchPackageJson = async (): Promise<any> => {
  const url =
    "https://raw.githubusercontent.com/n8n-io/n8n/master/packages/nodes-base/package.json";
  const response = await fetch(url);
  return response.json();
};

const savePackageJson = async (packageJsonData: any) => {
  const destinationPath = path.join("output", "package.json");
  fs.writeFileSync(destinationPath, JSON.stringify(packageJsonData, null, 2));
};

const retrievePackageJson = async () => {
  const packageJsonData = await fetchPackageJson();
  savePackageJson(packageJsonData);
};

export default retrievePackageJson;
