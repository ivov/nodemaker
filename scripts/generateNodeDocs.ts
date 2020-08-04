import NodeDocsGenerator from "../generators/NodeDocsGenerator";
import {
  regularNodeParameters,
  metaParameters,
  docsParameters,
} from "../parameters";

(async () => {
  const paramsBundle = {
    mainParameters: regularNodeParameters,
    metaParameters,
    docsParameters,
  };
  const generator = new NodeDocsGenerator(paramsBundle);
  const result = await generator.run();
  console.log(result);
})();
