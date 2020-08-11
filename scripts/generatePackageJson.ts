import PackageJsonGenerator from "../generators/PackageJsonGenerator";
import { metaParameters } from "../parameters";
import Highlighter from "../services/Highlighter";

(async () => {
  const generator = new PackageJsonGenerator(metaParameters);
  const result = await generator.run();

  Highlighter.showResult({
    result,
    successMessage: "Package.json successfully generated.",
    inspectMessage: true,
  });
})();
