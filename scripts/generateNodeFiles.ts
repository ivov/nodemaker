import NodeFilesGenerator from "../generators/NodeFilesGenerator";
import { mainParameters, metaParameters } from "../parameters";
import Prompter from "../services/Prompter";

(async () => {
  const { nodeGenerationType } = await Prompter.forNodeGeneration();
  const paramsBundle = { mainParameters, metaParameters, nodeGenerationType };
  const generator = new NodeFilesGenerator(paramsBundle);
  const result = await generator.run();
  console.log(result);
})();
