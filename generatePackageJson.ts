import PackageJsonGenerator from "./PackageJsonGenerator";
import sleep from "./utils/sleep";

const main = async () => {
  const generator = new PackageJsonGenerator();

  await generator.retrievePackageJson();

  generator.insertCredential();

  await sleep(1000); // to ensure both insertions succeed

  generator.insertService();
};

main();
