import fs from "fs";
import path from "path";

const readPackageJson = () => {
  const sourcePath = path.join("output", "package.json");
  return JSON.parse(fs.readFileSync(sourcePath).toString());
};

export default readPackageJson;
