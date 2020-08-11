import NodeDocsGenerator from "../generators/NodeDocsGenerator";
import {
  regularNodeParameters,
  metaParameters,
  docsParameters,
} from "../parameters";
import Highlighter from "../services/Highlighter";

(async () => {
  const paramsBundle = {
    mainParameters: regularNodeParameters,
    metaParameters,
    docsParameters,
  };
  const generator = new NodeDocsGenerator(paramsBundle);
  const result = await generator.run();

  Highlighter.showResult({
    result,
    successMessage: "Node documentation files successfully generated.",
    inspectMessage: true,
  });
})();
