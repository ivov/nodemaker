import NodeFilesGenerator from "../generators/NodeFilesGenerator";
import { NodeGenerationType, AuthType } from "../utils/enums";
import { mainParameters, metaParameters } from "../parameters";
import Prompter from "../utils/Prompter";

export const generateNodeFiles = (paramsBundle: ParamsBundle) => {
  const generator = new NodeFilesGenerator(paramsBundle);
  generator.generateMainNodeFile();
  generator.generateGenericFunctionsFile();

  if (paramsBundle.nodeGenerationType === NodeGenerationType.Complex)
    generator.generateResourceDescriptionFile();

  if (paramsBundle.metaParameters.authType === AuthType.OAuth2)
    generator.generateOAuth2CredentialsFile();
};

// used by CLI
(async () => {
  const { nodeGenerationType } = await Prompter.forNodeGeneration();
  generateNodeFiles({ mainParameters, metaParameters, nodeGenerationType });
})();
