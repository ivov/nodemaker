import { metaParameters } from "../parameters";
import NodeFilesGenerator from "../generators/NodeFilesGenerator";
import Prompter from "../utils/Prompter";
import { NodeGenerationType, AuthType } from "../utils/enums";

(async () => {
  const { nodeGenerationType } = await Prompter.forNodeGeneration();

  const generator = new NodeFilesGenerator();

  generator.generateMainNodeFile(nodeGenerationType);
  generator.generateGenericFunctionsFile();

  if (nodeGenerationType === NodeGenerationType.Complex) {
    generator.generateResourceDescriptionFile();
  }

  if (metaParameters.authType === AuthType.OAuth2) {
    generator.generateOAuth2CredentialsFile();
  }
})();
