import NodeFilesGenerator from "../generators/NodeFilesGenerator";
import { mainParameters, metaParameters } from "../parameters";
import Prompter from "../services/Prompter";
import { NodeTypeEnum } from "../utils/enums";

(async () => {
  const { nodeType } = await Prompter.forNodeType();

  let nodeGenerationType: NodeGenerationType;

  nodeType === NodeTypeEnum.Regular
    ? ({ nodeGenerationType } = await Prompter.forNodeGenerationType())
    : (nodeGenerationType = "Simple"); // default

  const paramsBundle = {
    mainParameters,
    metaParameters,
    nodeType,
    nodeGenerationType,
  };
  const generator = new NodeFilesGenerator(paramsBundle);
  const result = await generator.run();
  console.log(result);
})();
