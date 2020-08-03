import NodeDocsGenerator from "../generators/NodeDocsGenerator";
import { mainParameters, metaParameters, docsParameters } from "../parameters";

(async () => {
  const paramsBundle = { mainParameters, metaParameters, docsParameters };
  const generator = new NodeDocsGenerator(paramsBundle);
  const result = await generator.run();
  console.log(result);
})();
