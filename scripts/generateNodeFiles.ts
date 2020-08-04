import NodeFilesGenerator from "../generators/NodeFilesGenerator";
import { mainParameters, metaParameters } from "../parameters";
import Prompter from "../services/Prompter";

(async () => {
  const { nodeGenerationType } = await Prompter.forNodeGenerationType();
  const { nodeType } = await Prompter.forNodeType();
  const paramsBundle = {
    mainParameters,
    metaParameters,
    nodeGenerationType,
    nodeType,
  };
  const generator = new NodeFilesGenerator(paramsBundle);
  const result = await generator.run();
  console.log(result);
})();
