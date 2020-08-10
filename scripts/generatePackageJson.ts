import PackageJsonGenerator from "../generators/PackageJsonGenerator";
import sleep from "../utils/sleep";
import { metaParameters } from "../parameters";

(async () => {
  const generator = new PackageJsonGenerator(metaParameters);

  await generator.retrievePackageJson();

  generator.insertCredentialPathIntoPackageJson();

  await sleep(1000); // to ensure both insertions succeed

  generator.insertNodePathIntoPackageJson();
})();
