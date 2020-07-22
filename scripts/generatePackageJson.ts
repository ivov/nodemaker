import PackageJsonGenerator from "../generators/PackageJsonGenerator";
import sleep from "../utils/sleep";

(async () => {
  const generator = new PackageJsonGenerator();

  await generator.retrievePackageJson();

  generator.insertCredentialPathIntoPackageJson();

  await sleep(1000); // to ensure both insertions succeed

  generator.insertNodePathIntoPackageJson();
})();
