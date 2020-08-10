import PackageJsonGenerator from "../generators/PackageJsonGenerator";
import { metaParameters } from "../parameters";

(async () => {
  const generator = new PackageJsonGenerator(metaParameters);
  const result = await generator.run();
  console.log(result);
})();
