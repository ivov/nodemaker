import NodeFilesGenerator from "../generators/NodeFilesGenerator";
import {
  regularNodeParameters,
  triggerNodeParameters,
  metaParameters,
} from "../parameters";
import Prompter from "../services/Prompter";
import { NodeTypeEnum } from "../utils/enums";
import Highlighter from "../services/Highlighter";

(async () => {
  const { nodeType } = await Prompter.forNodeType();

  let nodeGenerationType: NodeGenerationType;

  // regular node may be simple or complex, trigger node is simple
  nodeType === NodeTypeEnum.Regular
    ? ({ nodeGenerationType } = await Prompter.forNodeGenerationType())
    : (nodeGenerationType = "Simple");

  const mainParameters =
    nodeType === NodeTypeEnum.Regular
      ? regularNodeParameters
      : triggerNodeParameters;

  const paramsBundle = {
    mainParameters,
    metaParameters,
    nodeType,
    nodeGenerationType,
  };

  const generator = new NodeFilesGenerator(paramsBundle);
  const result = await generator.run({ checkSorting: false });

  Highlighter.showResult({
    result,
    successMessage: "Node functionality files successfully generated.",
    inspectMessage: true,
  });
})();
